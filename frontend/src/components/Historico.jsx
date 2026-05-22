import { formatarNumero, formatarData } from '../utils/formato'
import MoedaIcone from './MoedaIcone'

function Historico({ itens, aoLimpar, carregando, className = '' }) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Histórico
        </h2>
        {itens.length > 0 && (
          <button
            type="button"
            onClick={aoLimpar}
            className="text-xs font-medium text-slate-400 transition hover:text-red-400"
          >
            Limpar
          </button>
        )}
      </div>

      {carregando && itens.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Carregando o histórico...</p>
      ) : itens.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          Nenhuma conversão salva ainda.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {itens.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-white/5 bg-slate-800/40 px-3 py-2.5"
            >
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MoedaIcone codigo={item.moeda_origem} tamanho="sm" />
                  {formatarNumero(item.valor)} {item.moeda_origem}
                </span>
                <span className="shrink-0 text-slate-500">→</span>
                <span className="flex min-w-0 items-center gap-1.5 font-semibold text-teal-400">
                  <MoedaIcone codigo={item.moeda_destino} tamanho="sm" />
                  <span className="truncate">
                    {formatarNumero(item.valor_convertido)} {item.moeda_destino}
                  </span>
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                {formatarData(item.criada_em)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Historico
