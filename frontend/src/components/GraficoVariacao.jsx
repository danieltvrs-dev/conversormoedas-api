import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatarNumero, formatarDiaMes } from '../utils/formato'

function GraficoVariacao({ dados, de, para }) {
  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
        Variação · {de} para {para}
      </h2>

      {dados.length === 0 ? (
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
