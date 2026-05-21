from datetime import datetime

import httpx

URL_BASE = "https://economia.awesomeapi.com.br/json"

MOEDAS = {
    "BRL": "Real Brasileiro",
    "USD": "Dólar Americano",
    "EUR": "Euro",
    "GBP": "Libra Esterlina",
    "JPY": "Iene Japonês",
    "BTC": "Bitcoin",
    "CAD": "Dólar Canadense",
    "AUD": "Dólar Australiano",
    "CHF": "Franco Suíço",
    "CNY": "Yuan Chinês",
}


class ErroCambio(Exception):
    def __init__(self, mensagem: str, status: int = 502):
        super().__init__(mensagem)
        self.mensagem = mensagem
        self.status = status


def listar_moedas() -> list[dict]:
    return [{"codigo": codigo, "nome": nome} for codigo, nome in MOEDAS.items()]


def converter(de: str, para: str, valor: float) -> dict:
    de = de.upper()
    para = para.upper()
    _validar_moeda(de)
    _validar_moeda(para)

    if de == para:
        cotacao = 1.0
        atualizado_em = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    else:
        cotacao, atualizado_em = _consultar_awesomeapi(de, para)

    return {
        "de": de,
        "para": para,
        "valor": valor,
        "cotacao": cotacao,
        "valor_convertido": valor * cotacao,
        "atualizado_em": atualizado_em,
    }


def _validar_moeda(codigo: str) -> None:
    if codigo not in MOEDAS:
        raise ErroCambio(f"Moeda não suportada: {codigo}", status=400)


def _consultar_awesomeapi(de: str, para: str) -> tuple[float, str]:
    try:
        resposta = httpx.get(f"{URL_BASE}/last/{de}-{para}", timeout=10)
    except httpx.RequestError:
        raise ErroCambio("Serviço de câmbio indisponível no momento.")

    if resposta.status_code == 404:
        raise ErroCambio(f"Não há cotação disponível para {de} e {para}.", status=404)
    if resposta.status_code != 200:
        raise ErroCambio("Serviço de câmbio indisponível no momento.")

    try:
        dados = resposta.json()[f"{de}{para}"]
        return float(dados["bid"]), dados["create_date"]
    except (KeyError, ValueError):
        raise ErroCambio("Resposta inesperada do serviço de câmbio.")
