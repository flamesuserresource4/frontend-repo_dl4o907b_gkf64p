import React from 'react'

function TopList({ items, onRefresh }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Top Family Prompts</h3>
        <button onClick={onRefresh} className="text-sm px-3 py-1 rounded bg-white/10 hover:bg-white/15 text-white border border-white/10">Refresh</button>
      </div>
      <ul className="space-y-3">
        {items && items.length > 0 ? items.map((p) => (
          <li key={p.id} className="p-3 rounded-lg bg-slate-900/40 border border-slate-700">
            <p className="text-blue-200 text-sm">{p.category}</p>
            <p className="text-white mt-1">Would you rather {p.option_a} or {p.option_b}?</p>
            <p className="text-blue-300/80 text-xs mt-1">A: {p.a_count} • B: {p.b_count}</p>
          </li>
        )) : (
          <li className="text-blue-200">No prompts yet. Be the first to add one!</li>
        )}
      </ul>
    </div>
  )
}

export default TopList
