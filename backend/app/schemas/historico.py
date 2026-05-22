from datetime import datetime

from pydantic import BaseModel


class ConversaoCriar(BaseModel):
    moeda_origem: str
    moeda_destino: str
    valor: float
    valor_convertido: float
    cotacao: float


class ConversaoLida(BaseModel):
    id: int
    moeda_origem: str
    moeda_destino: str
    valor: float
    valor_convertido: float
    cotacao: float
    criada_em: datetime

    model_config = {"from_attributes": True}
