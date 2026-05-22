import { NumericFormat } from 'react-number-format'

function CampoValor({ valor, aoMudar }) {
  return (
    <NumericFormat
      value={valor}
      onValueChange={(valores) => aoMudar(valores.value)}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      placeholder="0"
      inputMode="decimal"
      className="w-full min-w-0 bg-transparent text-2xl font-semibold text-slate-50 outline-none placeholder:text-slate-600"
    />
  )
}

export default CampoValor
