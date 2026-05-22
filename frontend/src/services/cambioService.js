import api from './api'

export async function listarMoedas() {
  const { data } = await api.get('/api/cambio/moedas')
  return data
}

export async function converter(de, para, valor) {
  const { data } = await api.get('/api/cambio/converter', {
    params: { de, para, valor },
  })
  return data
}

export async function buscarVariacao(de, para, dias = 15) {
  const { data } = await api.get('/api/cambio/variacao', {
    params: { de, para, dias },
  })
  return data
}
