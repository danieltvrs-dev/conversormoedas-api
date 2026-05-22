import api from './api'

export async function salvarConversao(conversao) {
  const { data } = await api.post('/api/historico', conversao)
  return data
}

export async function listarHistorico() {
  const { data } = await api.get('/api/historico')
  return data
}

export async function limparHistorico() {
  await api.delete('/api/historico')
}
