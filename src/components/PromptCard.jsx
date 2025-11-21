import React from 'react'

function PromptCard({ prompt, onVote }) {
  if (!prompt) return null
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl">
      <p className="text-blue-200/90 text-sm mb-2">Category: <span className="text-blue-300">{prompt.category}</span></p>
      <h2 className="text-3xl font-bold text-white text-center mb-6">Would you rather...</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <button onClick={() => onVote('a')} className="group rounded-xl border border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 p-5 transition text-left">
          <div className="text-6xl mb-3">🅰️</div>
          <p className="text-white text-lg">{prompt.option_a}</p>
          <p className="text-blue-300/80 text-sm mt-2">Votes: {prompt.a_count}</p>
        </button>
        <button onClick={() => onVote('b')} className="group rounded-xl border border-purple-400/30 bg-purple-500/10 hover:bg-purple-500/20 p-5 transition text-left">
          <div className="text-6xl mb-3">🅱️</div>
          <p className="text-white text-lg">{prompt.option_b}</p>
          <p className="text-purple-300/80 text-sm mt-2">Votes: {prompt.b_count}</p>
        </button>
      </div>
    </div>
  )
}

export default PromptCard
