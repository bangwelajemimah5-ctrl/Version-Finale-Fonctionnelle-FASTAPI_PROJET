from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    role = Column(String)


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    student_number = Column(String, unique=True, nullable=False) # Ton matricule UCC
    faculty = Column(String, nullable=False)
    department = Column(String, nullable=False)
    password = Column(String) # Optionnel si géré dans users, mais présent dans ta BDD
    


class DocumentType(Base):
    __tablename__ = "document_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Integer)


class DocumentRequest(Base):
    __tablename__ = "document_requests"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    document_type_id = Column(Integer, ForeignKey("document_types.id"), nullable=False)
    reason = Column(String, nullable=False) # Le motif
    status = Column(String) # pending, processing, etc.
    request_date = Column(DateTime)


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    document_request_id = Column(Integer, ForeignKey("document_requests.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    payment_method = Column(String, nullable=False)
    payment_statut = Column(String) # Notre fameux statut avec un "u" !
    payment_date = Column(DateTime)


class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    message = Column(String)
    is_read = Column(Boolean)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))