function CampoValor({ valor, aoMudar }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      min="0"
      placeholder="0"
      value={valor}
      onChange={(evento) => aoMudar(evento.target.value)}
      className="w-full min-w-0 bg-transparent text-2xl font-semibold text-slate-50 outline-none placeholder:text-slate-600"
    />
  )
}

export default CampoValor
