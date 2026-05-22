export function formatarNumero(numero) {
  if (numero === 0) return '0'
  const casasMaximas = Math.abs(numero) < 1 ? 8 : 2
  return numero.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: casasMaximas,
  })
}

export function formatarData(texto) {
  const data = new Date(texto.replace(' ', 'T'))
  return data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

export function formatarDiaMes(texto) {
  const [, mes, dia] = texto.split('-')
  return `${dia}/${mes}`
}
