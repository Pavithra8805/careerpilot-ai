import React from 'react'
import { useRouter } from 'next/router'

type Props = { children: React.ReactNode }

type State = { hasError: boolean; error?: Error }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: any) {
    // Ideally send to telemetry here
    // console.error('ErrorBoundary caught', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
          <div className="panel p-8 max-w-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong.</h2>
            <p className="text-slate-400 mb-6">An unexpected error occurred. Please try refreshing the page.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => location.reload()} className="px-4 py-2 rounded bg-emerald-500 text-white">Reload</button>
              <button onClick={() => (window.location.href = '/contact')} className="px-4 py-2 rounded bg-slate-700 text-white">Contact Support</button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children as JSX.Element
  }
}
