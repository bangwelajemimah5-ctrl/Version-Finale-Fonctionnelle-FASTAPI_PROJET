from backend.auth import get_current_user
import random
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from backend.database import get_db
from backend import models, schemas
from backend.auth import create_access_token, get_current_user

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

def generate_password():
    characters = "abcdefghijklmnopqrstuvwxyz0123456789"
    return ''.join(random.choice(characters) for _ in range(5))

# =========================================
# ADMIN LOGIN
# =========================================
@router.post("/login")
def admin_login(
    credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(
        models.User.username == credentials.username.strip()
    ).first()

    if not user or user.password != credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    if not user.role or user.role.strip().lower() != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Accès refusé : Cet utilisateur n'est pas un administrateur."
        )

    access_token = create_access_token(
        data={
            "sub": user.username,
            "role": "admin"
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "role": "admin"
        }
    }

# =========================================
# GET DASHBOARD STATS
# =========================================
@router.get("/dashboard/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    total_requests = db.query(models.DocumentRequest).count()

    en_attente = db.query(models.DocumentRequest).filter(
        models.DocumentRequest.status == "pending"
    ).count()
    
    traitees = db.query(models.DocumentRequest).filter(
        models.DocumentRequest.status.in_(["approved", "ready", "delivered"])
    ).count()

    return {
        "total_requests": int(total_requests),
        "summary": {
            "traitees": int(traitees),
            "en_attente": int(en_attente)
        }
    }

# =========================================
# GET ALL STUDENTS
# =========================================
@router.get(
    "/students",
    response_model=List[schemas.Student]
)
def get_students(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return db.query(models.Student).all()

#Récupérer les détails complets d'un étudiant, y compris ses requêtes et paiements

@router.get("/students/{student_id}/full-details")
def get_student_full_details(
    student_id: int, 
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_user) # Sécurisation : Seul l'admin a accès
):
    # 1. On récupère l'étudiant
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Étudiant introuvable")
    
    # 2. On récupère toutes ses requêtes de documents
    requests = db.query(models.DocumentRequest).filter(
        models.DocumentRequest.student_id == student_id
    ).all()
    
    # 3. On récupère tous ses paiements (via les requêtes liées)
    payments = db.query(models.Payment).join(models.DocumentRequest).filter(
        models.DocumentRequest.student_id == student_id
    ).all()
    
    # 4. Retour du "paquet" complet pour le frontend
    return {
        "student": student,
        "requests": requests,
        "payments": payments
    }

# ===================
# CREATE STUDENT 
# ================
@router.post(
    "/students",
    response_model=schemas.Student
)
def create_student(
    student: schemas.StudentCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Vérification des doublons sur le matricule
    existing_student = db.query(models.Student).filter(
        models.Student.student_number == student.student_number.strip()
    ).first()
    
    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un étudiant avec ce numéro de matricule existe déjà."
        )

    generated_password = generate_password()
    student_data = student.model_dump()
    student_data["password"] = generated_password

    # Création directe sans liaison user_id
    db_student = models.Student(**student_data)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

# =========================================
# UPDATE STUDENT
# =========================================
@router.put(
    "/students/{student_id}",
    response_model=schemas.Student
)
def update_student(
    student_id: int,
    student: schemas.StudentCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")

    db_student.first_name = student.first_name
    db_student.last_name = student.last_name
    db_student.email = student.email
    db_student.student_number = student.student_number
    db_student.faculty = student.faculty
    db_student.department = student.department

    db.commit()
    db.refresh(db_student)
    return db_student

# =========================================
# DELETE STUDENT
# =========================================
@router.delete("/students/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if student:
        db.delete(student)
        db.commit()
    return {"message": "Student deleted"}

# =========================================
# GET STUDENT REQUESTS (Désormais protégée)
# =========================================
@router.get(
    "/student/requests/{student_id}",
    response_model=List[dict]
)
def get_student_requests(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)  # Ajout de la protection
):
    requests = db.query(
        models.DocumentRequest,
        models.DocumentType
    ).join(
        models.DocumentType,
        models.DocumentRequest.document_type_id == models.DocumentType.id
    ).filter(
        models.DocumentRequest.student_id == student_id
    ).all()

    result = []
    for request, document_type in requests:
        result.append({
            "id": request.id,
            "document_name": document_type.name,
            "reason": request.reason,
            "status": request.status,
            "request_date": request.request_date
        })
    return result


# =========================================
# CREATE DOCUMENT TYPE
# =========================================
@router.post(
    "/document-types",
    response_model=schemas.DocumentType
)
def create_document_type(
    document_type: schemas.DocumentTypeCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_document_type = models.DocumentType(**document_type.model_dump())
    db.add(db_document_type)
    db.commit()
    db.refresh(db_document_type)
    return db_document_type

# =========================================
# GET DOCUMENT TYPES
# =========================================
@router.get(
    "/document_types",
    response_model=List[schemas.DocumentType]
)
def get_document_types(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return db.query(models.DocumentType).all()

# =========================================
# UPDATE DOCUMENT TYPE
# =========================================
@router.put(
    "/document-types/{document_type_id}",
    response_model=schemas.DocumentType
)
def update_document_type(
    document_type_id: int,
    document_type: schemas.DocumentTypeCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_document_type = db.query(models.DocumentType).filter(models.DocumentType.id == document_type_id).first()
    if not db_document_type:
        raise HTTPException(status_code=404, detail="Document type not found")

    db_document_type.name = document_type.name
    db_document_type.description = document_type.description
    db_document_type.price = document_type.price

    db.commit()
    db.refresh(db_document_type)
    return db_document_type

# =========================================
# DELETE DOCUMENT TYPE
# =========================================
@router.delete("/document-types/{document_type_id}")
def delete_document_type(
    document_type_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    document_type = db.query(models.DocumentType).filter(models.DocumentType.id == document_type_id).first()
    if document_type:
        db.delete(document_type)
        db.commit()
    return {"message": "Document type deleted"}

# =========================================
# GET ALL REQUESTS
# =========================================
@router.get(
    "/requests",
    response_model=List[dict]
)
def get_requests(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    requests = db.query(
        models.DocumentRequest,
        models.Student,
        models.DocumentType
    ).join(
        models.Student,
        models.DocumentRequest.student_id == models.Student.id
    ).join(
        models.DocumentType,
        models.DocumentRequest.document_type_id == models.DocumentType.id
    ).all()

    result = []
    for request, student, document_type in requests:
        result.append({
            "id": request.id,
            "student_name": f"{student.first_name} {student.last_name}",
            "document_name": document_type.name,
            "reason": request.reason,
            "status": request.status,
            "request_date": request.request_date
        })
    return result

# =========================================
# CREATE REQUEST
# =========================================
@router.post(
    "/requests",
    response_model=schemas.DocumentRequest
)
def create_request(
    request: schemas.DocumentRequestCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_request = models.DocumentRequest(**request.model_dump())
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

# =========================================
# UPDATE REQUEST WITH AUTOMATIC NOTIFICATION
# =========================================
@router.put("/requests/{request_id}", response_model=schemas.DocumentRequest)
def update_request(
    request_id: int,
    request: schemas.DocumentRequestUpdate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # 1. Récupérer la demande existante
    db_request = db.query(models.DocumentRequest).filter(models.DocumentRequest.id == request_id).first()
    if not db_request:
        raise HTTPException(status_code=404, detail="Request not found")

    old_status = db_request.status

    # 2. Mise à jour dynamique (Plus simple que votre version précédente)
    # On convertit le modèle Pydantic en dictionnaire, en excluant les champs non fournis
    update_data = request.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_request, key, value)

    # 3. Logique de notification
    # On vérifie si 'status' est présent dans les données mises à jour ET s'il a changé
    if "status" in update_data and old_status != update_data["status"]:
        status_translations = {
            "pending": "En attente de traitement",
            "processing": "En cours de traitement",
            "approved": "Approuvée (En cours de signature)",
            "rejected": "Rejetée",
            "ready": "Prête à être retirée",
            "delivered": "Remise en mains propres"
        }
        # On utilise update_data["status"] car c'est la nouvelle valeur
        statut_fr = status_translations.get(update_data["status"], update_data["status"])
        
        nouvelle_notif = models.Notification(
            student_id=db_request.student_id,
            message=f"Le statut de votre demande a été mis à jour : {statut_fr}.",
            is_read=False
        )
        db.add(nouvelle_notif)

    # 4. Sauvegarde
    db.commit()
    db.refresh(db_request)
    return db_request

# =========================================
# DELETE REQUEST
# =========================================
@router.delete("/requests/{request_id}")
def delete_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    request = db.query(models.DocumentRequest).filter(models.DocumentRequest.id == request_id).first()
    if request:
        db.delete(request)
        db.commit()
    return {"message": "Request deleted"}

# =========================================
# GET ALL PAYMENTS
# =========================================
@router.get("/payments")
def get_payments(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)  # Protection ajoutée
):
    payments = (
        db.query(
            models.Payment,
            models.DocumentRequest,
            models.Student,
            models.DocumentType
        )
        .join(models.DocumentRequest, models.Payment.document_request_id == models.DocumentRequest.id)
        .join(models.Student, models.DocumentRequest.student_id == models.Student.id)
        .join(models.DocumentType, models.DocumentRequest.document_type_id == models.DocumentType.id)
        .all()
    )

    result = []
    for p, r, s, dt in payments:
        result.append({
            "id": p.id,
            "amount": p.amount,
            "payment_method": p.payment_method,
            "payment_statut": p.payment_statut,
            "payment_date": p.payment_date,
            "student_name": f"{s.first_name} {s.last_name}",  
            "document_name": dt.name                                  
        })
    return result

# =========================================
# CREATE PAYMENT
# =========================================
@router.post("/payments", response_model=schemas.PaymentResponse)
def create_payment(
    payload: schemas.PaymentCreate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)  # Protection ajoutée
):
    req = db.query(models.DocumentRequest).filter(
        models.DocumentRequest.id == payload.document_request_id
    ).first()
    if not req:
        raise HTTPException(status_code=404, detail="Demande introuvable")

    dt = db.query(models.DocumentType).filter(
        models.DocumentType.id == req.document_type_id
    ).first()
    if not dt:
        raise HTTPException(status_code=404, detail="Type de document introuvable")

    db_payment = models.Payment(
        document_request_id=payload.document_request_id,
        amount=dt.price,
        payment_method=payload.payment_method,
        payment_statut="completed"
    )

    req.status = "processing"

    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)

    return db_payment

# =========================================
# UPDATE PAYMENT
# =========================================
@router.put("/payments/{payment_id}", response_model=schemas.PaymentResponse)
def update_payment(
    payment_id: int, 
    payload: schemas.PaymentUpdate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)  # Protection ajoutée
):
    p = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Paiement introuvable")

    p.payment_statut = payload.payment_statut
    db.commit()
    db.refresh(p)
    return p

# =========================================
# DELETE PAYMENT
# =========================================
@router.delete("/payments/{payment_id}")
def delete_payment(
    payment_id: int, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)  # Protection ajoutée
):
    p = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Paiement introuvable")

    db.delete(p)
    db.commit()
    return {"message": "Supprimé"}
