function BotaoInverter({ aoClicar }) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-label="Inverter as moedas"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-400/40 bg-slate-900 text-teal-400 transition hover:bg-teal-400 hover:text-slate-900"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 4v16M4 7l3-3 3 3" />
        <path d="M17 20V4M14 17l3 3 3-3" />
      </svg>
    </button>
  )
}

export default BotaoInverter
