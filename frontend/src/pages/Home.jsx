import { useEffect, useState } from 'react'
import { listarMoedas, converter, buscarVariacao } from '../services/cambioService'
import {
  salvarConversao,
  listarHistorico,
  limparHistorico,
} from '../services/historicoService'
import { formatarNumero, formatarData } from '../utils/formato'
import Cabecalho from '../components/Cabecalho'
import SeletorMoeda from '../components/SeletorMoeda'
import CampoValor from '../components/CampoValor'
import BotaoInverter from '../components/BotaoInverter'
import GraficoVariacao from '../components/GraficoVariacao'
import Historico from '../components/Historico'

function Home() {
  const [moedas, setMoedas] = useState([])
  const [de, setDe] = useState('USD')
  const [para, setPara] = useState('BRL')
  const [valor, setValor] = useState('1')
  const [resultado, setResultado] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [variacao, setVariacao] = useState([])
  const [periodo, setPeriodo] = useState(15)
  const [historico, setHistorico] = useState([])
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    listarMoedas()
      .then(setMoedas)
      .catch(() => setErro('Não foi possível carregar a lista de moedas.'))
  }, [])

  useEffect(() => {
    listarHistorico()
      .then(setHistorico)
      .catch(() => {})
  }, [])

  useEffect(() => {
    buscarVariacao(de, para, periodo)
      .then(setVariacao)
      .catch(() => setVariacao([]))
  }, [de, para, periodo])

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

  async function salvar() {
    if (!resultado) return
    setSalvando(true)
    try {
      const salva = await salvarConversao({
        moeda_origem: resultado.de,
        moeda_destino: resultado.para,
        valor: resultado.valor,
        valor_convertido: resultado.valor_convertido,
        cotacao: resultado.cotacao,
      })
      setHistorico((atual) => [salva, ...atual])
    } catch {
      setErro('Não foi possível salvar a conversão.')
    } finally {
      setSalvando(false)
    }
  }

  async function limpar() {
    if (!window.confirm('Limpar todo o histórico?')) return
    try {
      await limparHistorico()
      setHistorico([])
    } catch {
      setErro('Não foi possível limpar o histórico.')
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1120] text-slate-100">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-md px-4 py-10 lg:max-w-5xl">
        <Cabecalho />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl lg:col-span-1">
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
              {!erro && carregando && (
                <p className="text-slate-400">Convertendo...</p>
              )}
              {!erro && !carregando && resultado && (
                <div className="space-y-1 text-slate-400">
                  <p>
                    1 {resultado.de} = {formatarNumero(resultado.cotacao)}{' '}
                    {resultado.para}
                  </p>
                  <p>Atualizado em {formatarData(resultado.atualizado_em)}</p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={salvar}
              disabled={!resultado || carregando || salvando}
              className="mt-2 w-full rounded-xl bg-teal-400 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {salvando ? 'Salvando...' : 'Salvar no histórico'}
            </button>
          </div>

          <GraficoVariacao
            dados={variacao}
            de={de}
            para={para}
            periodo={periodo}
            aoMudarPeriodo={setPeriodo}
            className="lg:col-span-2"
          />

          <Historico
            itens={historico}
            aoLimpar={limpar}
            className="lg:col-span-3"
          />
        </div>
      </div>
    </main>
  )
}

export default Home
