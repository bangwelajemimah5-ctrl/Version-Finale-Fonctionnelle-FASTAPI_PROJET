# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List
# from backend import models, schemas
# from backend.database import get_db
# from backend.auth import get_current_user, create_access_token

# router = APIRouter(
#     prefix="/student",
#     tags=["student"]
# )

# @router.post("/login")
# def student_login(credentials: schemas.StudentLogin, db: Session = Depends(get_db)):
#     student = db.query(models.Student).filter(models.Student.student_number == credentials.student_number).first()
#     if not student or student.password != credentials.password:
#         raise HTTPException(status_code=401, detail="Invalid credentials")
    
#     access_token = create_access_token(data={"sub": student.student_number, "role": "student"})
#     return {"access_token": access_token, "token_type": "bearer", "student": {"id": student.id, "first_name": student.first_name, "last_name": student.last_name, "student_number": student.student_number}}

# @router.get("/document_types", response_model=List[schemas.DocumentType])
# def get_document_types(db: Session = Depends(get_db)):
#     return db.query(models.DocumentType).all()

# @router.post("/document_requests", response_model=schemas.DocumentRequest)
# def create_document_request(request: schemas.DocumentRequestCreate, db: Session = Depends(get_db)):
#     db_request = models.DocumentRequest(**request.model_dump())
#     db.add(db_request)
#     db.commit()
#     db.refresh(db_request)
#     return db_request

# @router.get("/document_requests/{student_id}")
# def get_student_requests(student_id: int, db: Session = Depends(get_db)):
#     requests = db.query(models.DocumentRequest, models.DocumentType).join(models.DocumentType, models.DocumentRequest.document_type_id == models.DocumentType.id).filter(models.DocumentRequest.student_id == student_id).all()
#     result = []
#     for request, document_type in requests:
#         result.append({"id": request.id, "document_name": document_type.name, "reason": request.reason, "status": request.status, "request_date": request.request_date})
#     return result

# @router.post("/payments", response_model=schemas.Payment)
# def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
#     document_request = db.query(models.DocumentRequest).filter(models.DocumentRequest.id == payment.document_request_id).first()
#     document_type = db.query(models.DocumentType).filter(models.DocumentType.id == document_request.document_type_id).first()
#     db_payment = models.Payment(document_request_id=payment.document_request_id, amount=document_type.price, payment_method=payment.payment_method)
#     document_request.status = "processing"
#     db.add(db_payment)
#     db.add(document_request)
#     db.commit()
#     db.refresh(db_payment)
#     return db_payment

# @router.get("/student/payments/{student_id}", response_model=list[dict])
# def get_student_payments(student_id: int, db: Session = Depends(get_db)):
#     payments = db.query(models.Payment, models.DocumentRequest, models.DocumentType).join(models.DocumentRequest, models.Payment.document_request_id == models.DocumentRequest.id).join(models.DocumentType, models.DocumentRequest.document_type_id == models.DocumentType.id).filter(models.DocumentRequest.student_id == student_id).all()
#     result = []
#     for payment, request, document_type in payments:
#         result.append({"id": payment.id, "document_name": document_type.name, "amount": payment.amount, "payment_method": payment.payment_method, "payment_date": payment.payment_date})
#     return result

# # =========================================
# # GET NOTIFICATIONS
# # =========================================
# @router.get("/notifications/{student_id}", response_model=list[dict])
# def get_student_notifications(student_id: int, db: Session = Depends(get_db)):
#     notifications = db.query(models.Notification).filter(
#         models.Notification.student_id == student_id
#     ).all()
    
#     return [
#         {
#             "id": n.id,
#             "message": n.message,
#             "is_read": n.is_read,
#             "created_at": n.created_at
#         } 
#         for n in notifications
#     ]

# # =========================================
# # MARK NOTIFICATION AS READ
# # =========================================
# @router.put("/notifications/{notification_id}")
# def mark_notification_read(notification_id: int, db: Session = Depends(get_db)):
#     notification = db.query(models.Notification).filter(
#         models.Notification.id == notification_id
#     ).first()
    
#     if not notification:
#         raise HTTPException(status_code=404, detail="Notification non trouvée")
    
#     notification.is_read = True
#     db.commit()
#     return {"message": "Notification marquée comme lue"}




from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend import models, schemas
from backend.database import get_db
from backend.auth import get_current_user, create_access_token

router = APIRouter(
    prefix="/student",
    tags=["student"]
)


# LOGIN reste tel quel...
@router.post("/login")
def student_login(credentials: schemas.StudentLogin, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.student_number == credentials.student_number).first()
    if not student or student.password != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": student.student_number, "role": "student"})
    return {"access_token": access_token, "token_type": "bearer", "student": {"id": student.id, "first_name": student.first_name, "last_name": student.last_name, "student_number": student.student_number}}

# --- DOCUMENT TYPES ---
@router.get("/document_types", response_model=List[schemas.DocumentType])
def get_document_types(db: Session = Depends(get_db)):
    return db.query(models.DocumentType).all()

# --- DOCUMENT REQUESTS ---
@router.post("/document_requests", response_model=schemas.DocumentRequest)
def create_document_request(request: schemas.DocumentRequestCreate, db: Session = Depends(get_db)):
    # 1. Création de l'objet
    new_request = models.DocumentRequest(
        student_id=request.student_id,
        document_type_id=request.document_type_id,
        reason=request.reason,
        status="En attente",
        request_date=datetime.now() 
    )
    
    db.add(new_request)
    db.commit()
    db.refresh(new_request) 
    return new_request

@router.get("/document_requests/{student_id}")
def get_student_requests(student_id: int, db: Session = Depends(get_db)):
    # Jointure avec DocumentType pour récupérer le nom
    results = db.query(models.DocumentRequest, models.DocumentType)\
        .join(models.DocumentType, models.DocumentRequest.document_type_id == models.DocumentType.id)\
        .filter(models.DocumentRequest.student_id == student_id).all()
    
    # Retourne une liste de dictionnaires que le frontend peut lire facilement
    return [
        {
            "id": req.id,
            "document_name": doc_type.name, 
            "reason": req.reason,
            "status": req.status,
            "request_date": req.request_date
        } 
        for req, doc_type in results
    ]
# --- PAYMENTS ---
@router.post("/payments", response_model=schemas.Payment)
def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    # 1. Récupérer la demande pour identifier le type de document
    doc_request = db.query(models.DocumentRequest).filter(
        models.DocumentRequest.id == payment.document_request_id
    ).first()
    
    # 2. Déterminer le montant
    if payment.amount is not None and payment.amount > 0:
        final_amount = payment.amount  # Cas Swagger : on utilise ce que vous avez tapé
    else:
        # Cas Frontend : on va chercher le prix officiel dans la BDD
        doc_type = db.query(models.DocumentType).filter(
            models.DocumentType.id == doc_request.document_type_id
        ).first()
        final_amount = doc_type.price
    
    # 3. Enregistrer
    db_payment = models.Payment(
        document_request_id=payment.document_request_id,
        amount=final_amount,
        payment_method=payment.payment_method,
        payment_statut="Pending",
        payment_date=datetime.now()
    )
    
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

@router.get("/payments/{student_id}", response_model=List[dict])
def get_student_payments(student_id: int, db: Session = Depends(get_db)):
    payments = db.query(models.Payment, models.DocumentRequest, models.DocumentType)\
        .join(models.DocumentRequest, models.Payment.document_request_id == models.DocumentRequest.id)\
        .join(models.DocumentType, models.DocumentRequest.document_type_id == models.DocumentType.id)\
        .filter(models.DocumentRequest.student_id == student_id).all()
    
    return [
        {
            "id": p.id,  # Assurez-vous que cette ligne est présente
            "document_name": dt.name,
            "amount": p.amount,
            "payment_method": p.payment_method,
            "payment_date": p.payment_date
        } 
        for p, dr, dt in payments
    ]

# --- NOTIFICATIONS ---
@router.get("/notifications/{student_id}", response_model=List[dict])
def get_student_notifications(student_id: int, db: Session = Depends(get_db)):
    notifications = db.query(models.Notification).filter(
        models.Notification.student_id == student_id
    ).all()
    return [
        {"id": n.id, "message": n.message, "is_read": n.is_read, "created_at": n.created_at} 
        for n in notifications
    ]

@router.put("/notifications/{notification_id}/read")
def mark_notification_as_read(notification_id: int, db: Session = Depends(get_db)):
    notification = db.query(models.Notification).filter(
        models.Notification.id == notification_id
    ).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification non trouvée")
    
    notification.is_read = True
    db.commit()
    return {"message": "Notification marquée comme lue"}