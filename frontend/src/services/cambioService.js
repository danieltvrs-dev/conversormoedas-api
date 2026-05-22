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
