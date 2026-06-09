import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handle(e: any) {
    e.preventDefault()
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      router.push('/dashboard')
    } else {
      alert(data.error || 'Login failed')
    }
  }

  return (
    <main className="container">
      <div className="mx-auto max-w-md">
        <div className="panel p-8 sm:p-10">
          <span className="eyebrow">Welcome back</span>
          <h2 className="heading-lg mt-4">Log in</h2>
          <p className="section-copy mt-2">Use your account to access the dashboard and protected features.</p>
          <form onSubmit={handle} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label className="label">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input" />
            </div>
            <div className="space-y-2">
              <label className="label">Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="input" />
            </div>
            <button className="button-primary w-full">Sign in</button>
          </form>
        </div>
      </div>
    </main>
  )
}
