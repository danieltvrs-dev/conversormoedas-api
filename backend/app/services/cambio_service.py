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
        cotacao, atualizado_em = _cotacao_via_real(de, para)

    return {
        "de": de,
        "para": para,
        "valor": valor,
        "cotacao": round(cotacao, 8),
        "valor_convertido": round(valor * cotacao, 8),
        "atualizado_em": atualizado_em,
    }


def _validar_moeda(codigo: str) -> None:
    if codigo not in MOEDAS:
        raise ErroCambio(f"Moeda não suportada: {codigo}", status=400)


def _cotacao_via_real(de: str, para: str) -> tuple[float, str]:
    a_consultar = [moeda for moeda in (de, para) if moeda != "BRL"]
    cotacoes = _consultar_awesomeapi(a_consultar)

    valor_de = 1.0 if de == "BRL" else cotacoes[de][0]
    valor_para = 1.0 if para == "BRL" else cotacoes[para][0]

    cotacao = valor_de / valor_para
    atualizado_em = max(cotacoes[moeda][1] for moeda in a_consultar)
    return cotacao, atualizado_em


def _consultar_awesomeapi(moedas: list[str]) -> dict[str, tuple[float, str]]:
    pares = ",".join(f"{moeda}-BRL" for moeda in moedas)
    try:
        resposta = httpx.get(f"{URL_BASE}/last/{pares}", timeout=10)
    except httpx.RequestError as erro:
        print(f"[cambio] erro em /last/{pares}: {type(erro).__name__}: {erro}")
        raise ErroCambio("Serviço de câmbio indisponível no momento.")

    if resposta.status_code != 200:
        raise ErroCambio("Serviço de câmbio indisponível no momento.")

    try:
        dados = resposta.json()
        resultado = {}
        for moeda in moedas:
            par = dados[f"{moeda}BRL"]
            resultado[moeda] = (float(par["bid"]), par["create_date"])
        return resultado
    except (KeyError, ValueError):
        raise ErroCambio("Resposta inesperada do serviço de câmbio.")


def variacao(de: str, para: str, dias: int) -> list[dict]:
    de = de.upper()
    para = para.upper()
    _validar_moeda(de)
    _validar_moeda(para)

    serie_de = _serie_diaria(de, dias)
    serie_para = _serie_diaria(para, dias)

    if serie_de is not None and serie_para is not None:
        datas = sorted(set(serie_de) & set(serie_para))
    elif serie_de is not None:
        datas = sorted(serie_de)
    elif serie_para is not None:
        datas = sorted(serie_para)
    else:
        datas = []

    pontos = []
    for data in datas:
        valor_de = 1.0 if serie_de is None else serie_de[data]
        valor_para = 1.0 if serie_para is None else serie_para[data]
        pontos.append({"data": data, "cotacao": round(valor_de / valor_para, 8)})
    return pontos


def _serie_diaria(moeda: str, dias: int) -> dict | None:
    if moeda == "BRL":
        return None

    try:
        resposta = httpx.get(f"{URL_BASE}/daily/{moeda}-BRL/{dias}", timeout=10)
    except httpx.RequestError as erro:
        print(f"[cambio] erro em /daily/{moeda}-BRL/{dias}: {type(erro).__name__}: {erro}")
        raise ErroCambio("Serviço de câmbio indisponível no momento.")

    if resposta.status_code != 200:
        raise ErroCambio("Serviço de câmbio indisponível no momento.")

    try:
        serie = {}
        for item in resposta.json():
            data = datetime.fromtimestamp(int(item["timestamp"])).strftime("%Y-%m-%d")
            serie.setdefault(data, float(item["bid"]))
        return serie
    except (KeyError, ValueError, TypeError):
        raise ErroCambio("Resposta inesperada do serviço de câmbio.")
