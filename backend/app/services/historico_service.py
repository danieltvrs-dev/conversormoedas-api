from sqlalchemy.orm import Session

from app.models.conversao import Conversao
from app.schemas.historico import ConversaoCriar


def salvar(db: Session, dados: ConversaoCriar) -> Conversao:
    conversao = Conversao(**dados.model_dump())
    db.add(conversao)
    db.commit()
    db.refresh(conversao)
    return conversao


def listar(db: Session) -> list[Conversao]:
    return db.query(Conversao).order_by(Conversao.criada_em.desc()).all()


def limpar(db: Session) -> int:
    total = db.query(Conversao).delete()
    db.commit()
    return total
