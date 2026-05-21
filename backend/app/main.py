from fastapi import FastAPI

app = FastAPI(title="API de Conversão de Moedas")


@app.get("/")
def raiz():
    return {"mensagem": "API de Conversão de Moedas está no ar"}
