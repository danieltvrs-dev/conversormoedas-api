function Cabecalho() {
  return (
    <header className="mb-8 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400 text-slate-900">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 9h16" />
          <path d="M16 5l4 4-4 4" />
          <path d="M20 15H4" />
          <path d="M8 11l-4 4 4 4" />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-50">
          Conversor de Moedas
        </h1>
        <p className="text-xs text-slate-400">Cotações em tempo real</p>
      </div>
    </header>
  )
}

export default Cabecalho
