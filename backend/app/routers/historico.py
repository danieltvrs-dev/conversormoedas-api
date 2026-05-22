from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.historico import ConversaoCriar, ConversaoLida
from app.services import historico_service

router = APIRouter(prefix="/api/historico", tags=["Histórico"])


@router.post("", response_model=ConversaoLida, status_code=status.HTTP_201_CREATED)
def salvar_conversao(dados: ConversaoCriar, db: Session = Depends(get_db)):
    return historico_service.salvar(db, dados)


@router.get("", response_model=list[ConversaoLida])
def listar_conversoes(db: Session = Depends(get_db)):
    return historico_service.listar(db)


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
def limpar_historico(db: Session = Depends(get_db)):
    historico_service.limpar(db)
