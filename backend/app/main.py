from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import conversao  # importado para registrar a tabela no SQLAlchemy
from app.routers import cambio

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API de Conversão de Moedas")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cambio.router)


@app.get("/")
def raiz():
    return {"mensagem": "API de Conversão de Moedas está no ar"}
