import { formatarNumero, formatarData } from '../utils/formato'
import Sparkline from './Sparkline'

function CartaoCotacao({ resultado, variacao }) {
  return (
    <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-teal-400/20 bg-teal-400/5 p-4">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-teal-300/80">
          Cotação atual
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-slate-100">
          1 {resultado.de} = {formatarNumero(resultado.cotacao)} {resultado.para}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">
          Atualizado em {formatarData(resultado.atualizado_em)}
        </p>
      </div>
      <Sparkline dados={variacao} />
    </div>
  )
}

export default CartaoCotacao
