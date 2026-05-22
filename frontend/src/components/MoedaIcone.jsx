import BR from 'country-flag-icons/react/1x1/BR'
import US from 'country-flag-icons/react/1x1/US'
import EU from 'country-flag-icons/react/1x1/EU'
import GB from 'country-flag-icons/react/1x1/GB'
import JP from 'country-flag-icons/react/1x1/JP'
import CA from 'country-flag-icons/react/1x1/CA'
import AU from 'country-flag-icons/react/1x1/AU'
import CH from 'country-flag-icons/react/1x1/CH'
import CN from 'country-flag-icons/react/1x1/CN'

const BANDEIRA = {
  BRL: BR,
  USD: US,
  EUR: EU,
  GBP: GB,
  JPY: JP,
  CAD: CA,
  AUD: AU,
  CHF: CH,
  CNY: CN,
}

function MoedaIcone({ codigo, tamanho = 'md' }) {
  const dimensao = tamanho === 'sm' ? 'h-6 w-6' : 'h-8 w-8'

  if (codigo === 'BTC') {
    return (
      <span
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center rounded-full bg-amber-500 font-bold text-white ${dimensao} ${
          tamanho === 'sm' ? 'text-[10px]' : 'text-xs'
        }`}
      >
        ₿
      </span>
    )
  }

  const Bandeira = BANDEIRA[codigo]
  if (!Bandeira) {
    return <span className={`shrink-0 rounded-full bg-slate-600 ${dimensao}`} />
  }

  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-full ${dimensao}`}
      title={codigo}
    >
      <Bandeira className="h-full w-full object-cover" />
    </span>
  )
}

export default MoedaIcone
