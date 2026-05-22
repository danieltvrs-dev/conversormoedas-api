import { BANDEIRAS } from '../utils/bandeiras'

function SeletorMoeda({ moedas, valor, aoMudar }) {
  return (
    <select
      value={valor}
      onChange={(evento) => aoMudar(evento.target.value)}
      className="shrink-0 rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 outline-none focus:border-teal-400/60"
    >
      {moedas.length === 0 && (
        <option value={valor}>
          {BANDEIRAS[valor] ?? ''} {valor}
        </option>
      )}
      {moedas.map((moeda) => (
        <option key={moeda.codigo} value={moeda.codigo}>
          {BANDEIRAS[moeda.codigo] ?? ''} {moeda.codigo}
        </option>
      ))}
    </select>
  )
}

export default SeletorMoeda
