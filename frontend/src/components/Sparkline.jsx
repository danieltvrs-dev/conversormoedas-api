import { Area, AreaChart } from 'recharts'

function Sparkline({ dados }) {
  if (dados.length < 2) return null

  return (
    <AreaChart
      width={96}
      height={48}
      data={dados}
      margin={{ top: 4, right: 0, bottom: 4, left: 0 }}
    >
      <defs>
        <linearGradient id="corSparkline" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="cotacao"
        stroke="#2dd4bf"
        strokeWidth={1.5}
        fill="url(#corSparkline)"
        dot={false}
      />
    </AreaChart>
  )
}

export default Sparkline
