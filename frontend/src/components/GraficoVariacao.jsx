import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatarNumero, formatarDiaMes } from '../utils/formato'

const PERIODOS = [7, 15, 30]

function calcularVariacao(dados) {
  if (dados.length < 2) return null
  const inicio = dados[0].cotacao
  const fim = dados[dados.length - 1].cotacao
  if (inicio === 0) return null
  return ((fim - inicio) / inicio) * 100
}

function GraficoVariacao({
  dados,
  de,
  para,
  periodo,
  aoMudarPeriodo,
  carregando,
  className = '',
}) {
  const variacao = calcularVariacao(dados)
  const subiu = variacao !== null && variacao >= 0

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Variação · {de} para {para}
        </h2>
        {variacao !== null && (
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
              subiu ? 'bg-teal-400/15 text-teal-300' : 'bg-red-400/15 text-red-300'
            }`}
          >
            {subiu ? '▲' : '▼'}{' '}
            {Math.abs(variacao).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %
          </span>
        )}
      </div>

      <div className="mt-3 inline-flex rounded-lg border border-white/10 bg-slate-800/40 p-0.5">
        {PERIODOS.map((dias) => (
          <button
            key={dias}
            type="button"
            onClick={() => aoMudarPeriodo(dias)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition ${
              periodo === dias
                ? 'bg-teal-400 text-slate-900'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {dias}d
          </button>
        ))}
      </div>

      {carregando && dados.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Carregando o gráfico...</p>
      ) : dados.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          Sem dados de variação para este par.
        </p>
      ) : (
        <div className="mt-4 h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dados} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="corVariacao" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="data"
                tickFormatter={formatarDiaMes}
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={formatarNumero}
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={56}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#2dd4bf' }}
                labelFormatter={formatarDiaMes}
                formatter={(valor) => [formatarNumero(valor), 'Cotação']}
              />
              <Area
                type="monotone"
                dataKey="cotacao"
                stroke="#2dd4bf"
                strokeWidth={2}
                fill="url(#corVariacao)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}

export default GraficoVariacao
