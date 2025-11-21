import React, { useState } from 'react'

function AddPromptModal({ open, onClose, onCreate }) {
  const [optionA, setOptionA] = useState('')
  const [optionB, setOptionB] = useState('')
  const [category, setCategory] = useState('general')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (optionA.trim().length < 3 || optionB.trim().length < 3) {
      setError('Please write a bit more for each option.')
      return
    }
    setLoading(true)
    try {
      await onCreate({ option_a: optionA, option_b: optionB, category })
      setOptionA('')
      setOptionB('')
      setCategory('general')
      onClose()
    } catch (err) {
      setError(err?.message || 'Failed to create prompt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Add a Family Prompt</h3>
          <button onClick={onClose} className="text-blue-300">Close</button>
        </div>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-blue-200 text-sm mb-1">Option A</label>
            <input value={optionA} onChange={(e) => setOptionA(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" placeholder="e.g., fly for a day" />
          </div>
          <div>
            <label className="block text-blue-200 text-sm mb-1">Option B</label>
            <input value={optionB} onChange={(e) => setOptionB(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" placeholder="e.g., be invisible for a day" />
          </div>
          <div>
            <label className="block text-blue-200 text-sm mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white">
              <option value="general">General</option>
              <option value="silly">Silly</option>
              <option value="outdoor">Outdoor</option>
              <option value="chores">Chores</option>
            </select>
          </div>
          <button disabled={loading} type="submit" className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white">
            {loading ? 'Adding...' : 'Add Prompt'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddPromptModal
