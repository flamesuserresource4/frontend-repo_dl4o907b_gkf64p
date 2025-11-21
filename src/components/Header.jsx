import React from 'react'

function Header({ onAddPrompt }) {
  return (
    <header className="w-full flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 grid place-items-center">
          <span className="text-blue-300 font-bold">WB</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Would You Rather</h1>
          <p className="text-sm text-blue-200/70">A family-friendly game</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onAddPrompt} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/10 transition">
          Add a prompt
        </button>
        <a href="/test" className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition">Check backend</a>
      </div>
    </header>
  )
}

export default Header
