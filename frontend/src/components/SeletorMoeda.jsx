import MoedaIcone from './MoedaIcone'

function SeletorMoeda({ moedas, valor, aoMudar }) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <MoedaIcone codigo={valor} />
      <select
        value={valor}
        onChange={(evento) => aoMudar(evento.target.value)}
        className="rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 outline-none focus:border-teal-400/60"
      >
        {moedas.length === 0 && <option value={valor}>{valor}</option>}
        {moedas.map((moeda) => (
          <option key={moeda.codigo} value={moeda.codigo}>
            {moeda.codigo}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SeletorMoeda
