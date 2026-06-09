import { useState } from 'react'

export default function ResumeAI(){
  const [text, setText] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handle(e: any){
    e.preventDefault()
    setLoading(true)
    const res = await fetch('http://localhost:3001/resume/summary', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text })
    })
    const data = await res.json()
    setResult(data.summary)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="panel p-8 sm:p-10">
          <span className="eyebrow">Resume insights</span>
          <h2 className="heading-lg mt-4">Resume AI</h2>
          <p className="section-copy mt-2">Paste resume text or a job description and get a concise, recruiter-friendly summary.</p>
          <form onSubmit={handle} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label className="label">Content</label>
              <textarea value={text} onChange={e => setText(e.target.value)} className="input min-h-80 resize-y" placeholder="Paste resume or job description" />
            </div>
            <div className="flex items-center gap-3">
              <button className="button-primary">Analyze</button>
              {loading && <span className="text-sm muted">Analyzing…</span>}
            </div>
          </form>
          </div>

          <aside className="panel p-8 sm:p-10">
          <h3 className="text-lg font-semibold text-white">What you’ll get</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            <li>• A cleaner summary of your strengths</li>
            <li>• Quick guidance on tone and clarity</li>
            <li>• Easy-to-scan improvement suggestions</li>
          </ul>
          {result && (
            <section className="mt-8 surface p-5">
              <h3 className="text-base font-semibold text-white">Suggestions</h3>
              <pre className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-200">{result}</pre>
            </section>
          )}
          </aside>
        </div>
      </div>
    </div>
  )
}
