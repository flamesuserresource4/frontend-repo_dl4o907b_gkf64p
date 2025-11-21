import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import PromptCard from './components/PromptCard'
import TopList from './components/TopList'
import AddPromptModal from './components/AddPromptModal'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [current, setCurrent] = useState(null)
  const [top, setTop] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchRandom = async () => {
    setError('')
    try {
      const res = await fetch(`${BASE_URL}/api/prompts/random`)
      if (!res.ok) throw new Error('Could not load a prompt')
      const data = await res.json()
      setCurrent(data)
    } catch (e) {
      setError(e.message)
    }
  }

  const fetchTop = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/prompts/top?limit=5`)
      if (res.ok) {
        const data = await res.json()
        setTop(data)
      }
    } catch {}
  }

  const vote = async (opt) => {
    if (!current) return
    const res = await fetch(`${BASE_URL}/api/votes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt_id: current.id, option: opt })
    })
    if (res.ok) {
      const updated = await res.json()
      setCurrent(updated)
      fetchTop()
    }
  }

  const createPrompt = async (payload) => {
    const res = await fetch(`${BASE_URL}/api/prompts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Failed to create prompt')
    const data = await res.json()
    setCurrent(data)
    fetchTop()
  }

  useEffect(() => {
    Promise.all([fetchRandom(), fetchTop()]).finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative min-h-screen p-6 md:p-10 max-w-5xl mx-auto">
        <Header onAddPrompt={() => setOpen(true)} />

        {loading ? (
          <p className="text-blue-200">Loading game...</p>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-4 rounded-xl">{error}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <PromptCard prompt={current} onVote={vote} />
              <div className="flex gap-3">
                <button onClick={fetchRandom} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/10">New random</button>
              </div>
            </div>
            <TopList items={top} onRefresh={fetchTop} />
          </div>
        )}

        <AddPromptModal open={open} onClose={() => setOpen(false)} onCreate={createPrompt} />
      </div>
    </div>
  )
}

export default App
