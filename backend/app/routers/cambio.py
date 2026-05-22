from fastapi import APIRouter, HTTPException, Query

from app.schemas.cambio import Moeda, PontoVariacao, RespostaConversao
from app.services import cambio_service
from app.services.cambio_service import ErroCambio

router = APIRouter(prefix="/api/cambio", tags=["Câmbio"])


@router.get("/moedas", response_model=list[Moeda])
def listar_moedas():
    return cambio_service.listar_moedas()


@router.get("/converter", response_model=RespostaConversao)
def converter(
    de: str = Query(..., description="Código da moeda de origem, ex: USD"),
    para: str = Query(..., description="Código da moeda de destino, ex: BRL"),
    valor: float = Query(..., gt=0, description="Valor a ser convertido"),
):
    try:
        return cambio_service.converter(de, para, valor)
    except ErroCambio as erro:
        raise HTTPException(status_code=erro.status, detail=erro.mensagem)


@router.get("/variacao", response_model=list[PontoVariacao])
def obter_variacao(
    de: str = Query(..., description="Código da moeda de origem, ex: USD"),
    para: str = Query(..., description="Código da moeda de destino, ex: BRL"),
    dias: int = Query(15, ge=2, le=90, description="Número de dias do histórico"),
):
    try:
        return cambio_service.variacao(de, para, dias)
    except ErroCambio as erro:
        raise HTTPException(status_code=erro.status, detail=erro.mensagem)
