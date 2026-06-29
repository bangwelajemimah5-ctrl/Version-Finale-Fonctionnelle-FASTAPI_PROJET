from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# --- BASE ET CRÉATION ---
class StudentBase(BaseModel):
    student_number: str
    first_name: str
    last_name: str
    email: Optional[str] = None
    faculty: str
    department: str
   

class StudentCreate(StudentBase):
    password: str

# --- SCHÉMA STUDENT ---
class Student(StudentBase):
    id: int
    password: Optional[str] = None

    class Config:
        from_attributes = True

# --- SCHÉMAS D'AUTHENTIFICATION ---
class StudentLogin(BaseModel):
    student_number: str
    password: str
class AdminLogin(BaseModel):
    username: str
    password: str

# --- SCHÉMAS DOCUMENT & REQUEST ---
class DocumentTypeCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: int

class DocumentType(DocumentTypeCreate):
    id: int

    class Config:
        from_attributes = True

class DocumentRequestCreate(BaseModel):
    student_id: int
    document_type_id: int
    reason: str

class DocumentRequest(DocumentRequestCreate):
    id: int
    status: str
    request_date: datetime

    class Config:
        from_attributes = True
class DocumentRequestUpdate(BaseModel):
    student_id: Optional[int] = None
    document_type_id: Optional[int] = None
    reason: Optional[str] = None
    status: Optional[str] = None

# --- SCHÉMAS PAIEMENT ---
class PaymentCreate(BaseModel):
    document_request_id: int
    payment_method: str
    amount: Optional[int] = None

class Payment(PaymentCreate):
    id: int
    payment_statut: str
    payment_date: datetime

    class Config:
        from_attributes = True

class PaymentResponse(Payment):
    class Config:
        from_attributes = True
class PaymentUpdate(BaseModel):
    payment_statut: Optional[str] = None
    amount: Optional[int] = None
# --- SCHÉMAS NOTIFICATION ---
class Notification(BaseModel):
    id: int
    student_id: int
    request_id: Optional[int] = None # Ajouté
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True