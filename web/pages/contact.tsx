import { useState } from 'react'

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    async function submit(e: any) {
        e.preventDefault()
        setStatus('sending')
        const res = await fetch('http://localhost:3001/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
        })
        if (res.ok) {
            setStatus('sent')
            setName(''); setEmail(''); setMessage('')
        } else {
            setStatus('error')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="panel p-8 sm:p-10">
                    <span className="eyebrow">Contact channel</span>
                    <h2 className="heading-lg mt-4">Contact</h2>
                    <p className="section-copy mt-2">Send a message and we’ll route it through SMTP to the inbox you configured.</p>
                    <form onSubmit={submit} className="mt-8 grid gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="label">Name</label>
                                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="input" />
                            </div>
                            <div className="space-y-2">
                                <label className="label">Email</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="input" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="label">Message</label>
                            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" className="input min-h-40 resize-y" />
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <button className="button-primary">Send message</button>
                            {status === 'sending' && <span className="text-sm muted">Sending...</span>}
                            {status === 'sent' && <span className="text-sm font-medium text-emerald-300">Sent — check your inbox.</span>}
                            {status === 'error' && <span className="text-sm font-medium text-rose-400">Error sending.</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
