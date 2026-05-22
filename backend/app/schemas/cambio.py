from pydantic import BaseModel


class Moeda(BaseModel):
    codigo: str
    nome: str


class RespostaConversao(BaseModel):
    de: str
    para: str
    valor: float
    cotacao: float
    valor_convertido: float
    atualizado_em: str


class PontoVariacao(BaseModel):
    data: str
    cotacao: float
