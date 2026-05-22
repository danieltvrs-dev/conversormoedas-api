from datetime import datetime

from sqlalchemy import Column, DateTime, Float, Integer, String

from app.database import Base


class Conversao(Base):
    __tablename__ = "conversoes"

    id = Column(Integer, primary_key=True)
    moeda_origem = Column(String, nullable=False)
    moeda_destino = Column(String, nullable=False)
    valor = Column(Float, nullable=False)
    valor_convertido = Column(Float, nullable=False)
    cotacao = Column(Float, nullable=False)
    criada_em = Column(DateTime, default=datetime.now)
