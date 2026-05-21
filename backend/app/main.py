from fastapi import FastAPI

from app.routers import cambio

app = FastAPI(title="API de Conversão de Moedas")

app.include_router(cambio.router)


@app.get("/")
def raiz():
    return {"mensagem": "API de Conversão de Moedas está no ar"}
