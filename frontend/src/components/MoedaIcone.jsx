import { MOEDA_ESTILO } from '../utils/moedaEstilo'

function MoedaIcone({ codigo, tamanho = 'md' }) {
  const estilo = MOEDA_ESTILO[codigo] ?? { cor: 'bg-slate-600', simbolo: '?' }
  const dimensao =
    tamanho === 'sm' ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-xs'

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${estilo.cor} ${dimensao}`}
    >
      {estilo.simbolo}
    </span>
  )
}

export default MoedaIcone
