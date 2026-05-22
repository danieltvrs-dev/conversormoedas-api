import { useEffect, useState } from 'react'
import { listarMoedas, converter } from '../services/cambioService'
import { formatarNumero, formatarData } from '../utils/formato'
import SeletorMoeda from '../components/SeletorMoeda'
import CampoValor from '../components/CampoValor'
import BotaoInverter from '../components/BotaoInverter'

function Home() {
  const [moedas, setMoedas] = useState([])
  const [de, setDe] = useState('USD')
  const [para, setPara] = useState('BRL')
  const [valor, setValor] = useState('1')
  const [resultado, setResultado] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    listarMoedas()
      .then(setMoedas)
      .catch(() => setErro('Não foi possível carregar a lista de moedas.'))
  }, [])

  useEffect(() => {
    const numero = Number(valor)
    if (!numero || numero <= 0) {
      setResultado(null)
      setErro('')
      return
    }

    setCarregando(true)
    const tempo = setTimeout(() => {
      converter(de, para, numero)
        .then((dados) => {
          setResultado(dados)
          setErro('')
        })
        .catch(() => setErro('Não foi possível converter agora. Tente de novo.'))
        .finally(() => setCarregando(false))
    }, 400)

    return () => clearTimeout(tempo)
  }, [de, para, valor])

  function inverter() {
    setDe(para)
    setPara(de)
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b1120] p-4 text-slate-100">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Conversor de Moedas</h1>
          <p className="mt-1 text-sm text-slate-400">Cotações em tempo real</p>
        </header>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl">
          <div className="rounded-xl border border-white/5 bg-slate-800/40 p-4">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Você converte
            </span>
            <div className="mt-2 flex items-center gap-3">
              <CampoValor valor={valor} aoMudar={setValor} />
              <SeletorMoeda moedas={moedas} valor={de} aoMudar={setDe} />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="z-10 -my-3">
              <BotaoInverter aoClicar={inverter} />
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-slate-800/40 p-4">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Convertido para
            </span>
            <div className="mt-2 flex items-center gap-3">
              <div className="w-full min-w-0 truncate text-2xl font-semibold text-teal-400">
                {resultado ? formatarNumero(resultado.valor_convertido) : '—'}
              </div>
              <SeletorMoeda moedas={moedas} valor={para} aoMudar={setPara} />
            </div>
          </div>

          <div className="mt-4 min-h-[2.5rem] text-sm">
            {erro && <p className="text-red-400">{erro}</p>}
            {!erro && carregando && <p className="text-slate-400">Convertendo...</p>}
            {!erro && !carregando && resultado && (
              <div className="space-y-1 text-slate-400">
                <p>
                  1 {resultado.de} = {formatarNumero(resultado.cotacao)} {resultado.para}
                </p>
                <p>Atualizado em {formatarData(resultado.atualizado_em)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
