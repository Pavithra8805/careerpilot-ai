import { useEffect, useState } from 'react'

type AppItem = { id: string; company: string; role: string; status: string }

export default function Tracker() {
  const [items, setItems] = useState<AppItem[]>([])
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')

  async function load() {
    const res = await fetch('http://localhost:3001/applications')
    const data = await res.json()
    setItems(data.items || [])
  }

  useEffect(() => {
    load()
  }, [])

  async function add(e: any) {
    e.preventDefault()
    await fetch('http://localhost:3001/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, role }),
    })
    setCompany('')
    setRole('')
    load()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="panel p-8 sm:p-10">
          <span className="eyebrow">Job search ops</span>
          <h2 className="heading-lg mt-4">Application Tracker</h2>
          <p className="section-copy mt-2">Keep the companies, roles, and status in a clean dashboard view.</p>

          <form onSubmit={add} className="mt-8 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" className="input" />
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role" className="input" />
            <button className="button-primary">Add</button>
          </form>

          <div className="mt-8 grid gap-4">
            {items.map((it) => (
              <div key={it.id} className="surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-base font-semibold text-white">
                    {it.role} — {it.company}
                  </div>
                  <div className="mt-1 text-sm text-slate-300">{it.status}</div>
                </div>
                <div className="text-sm font-medium text-slate-300">ID {it.id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
