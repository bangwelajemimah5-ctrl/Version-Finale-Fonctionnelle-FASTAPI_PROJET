from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# CORRECTION : On utilise la syntaxe relative au projet
from backend.routers import students, admin, auth
from backend import models
from backend.database import engine

# Création automatique des tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Academic Document Manager")

# =========================================
# CORS CONFIGURATION
# =========================================
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================
# ENREGISTREMENT DES ROUTEURS
# =========================================
# Inclusion des routes authentification, étudiants et administrateurs
app.include_router(auth.router)
app.include_router(students.router)
app.include_router(admin.router)