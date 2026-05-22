from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import cambio

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
