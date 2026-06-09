import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Manrope } from 'next/font/google'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Footer from '../components/Footer'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${manrope.variable} min-h-screen flex flex-col`} style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
            <Header />
            <ErrorBoundary>
                <div className="flex-1">
                    <Component {...pageProps} />
                </div>
            </ErrorBoundary>
            <Footer />
        </div>
    )
}
