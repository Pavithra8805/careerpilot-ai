import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface User {
    id: string
    name: string
    email: string
}

interface AppStats {
    total: number
    pending: number
    rejected: number
    offers: number
    successRate: number
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    const [stats, setStats] = useState<AppStats>({
        total: 0,
        pending: 0,
        rejected: 0,
        offers: 0,
        successRate: 0,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetchUserData()
        fetchStats()
    }, [])

    async function fetchUserData() {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            const res = await fetch('http://localhost:3001/api/protected', {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!res.ok) throw new Error('Failed to fetch user data')

            const data = await res.json()
            setUser(data.user)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load profile')
            router.push('/login')
        }
    }

    async function fetchStats() {
        try {
            const res = await fetch('http://localhost:3001/applications')
            if (res.ok) {
                const data = await res.json()
                const items = data.items || []
                
                const total = items.length
                const pending = items.filter((item: any) => item.status === 'pending').length
                const rejected = items.filter((item: any) => item.status === 'rejected').length
                const offers = items.filter((item: any) => item.status === 'offer').length
                const successRate = total > 0 ? Math.round((offers / total) * 100) : 0

                setStats({ total, pending, rejected, offers, successRate })
            }
        } catch (err) {
            console.error('Failed to fetch stats:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
                    <p className="mt-4 text-slate-300">Loading your profile...</p>
                </div>
            </div>
        )
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="panel text-center p-8">
                    <p className="text-red-400 mb-4">{error || 'Failed to load profile'}</p>
                    <button onClick={() => router.push('/login')} className="button-primary">
                        Go to Login
                    </button>
                </div>
            </div>
        )
    }

    const statCards = [
        {
            label: 'Total Applications',
            value: stats.total,
            color: 'from-blue-500 to-blue-600',
            icon: '📋',
        },
        {
            label: 'Pending',
            value: stats.pending,
            color: 'from-yellow-500 to-yellow-600',
            icon: '⏳',
        },
        {
            label: 'Rejected',
            value: stats.rejected,
            color: 'from-red-500 to-red-600',
            icon: '❌',
        },
        {
            label: 'Offers',
            value: stats.offers,
            color: 'from-emerald-500 to-emerald-600',
            icon: '🎉',
        },
        {
            label: 'Success Rate',
            value: `${stats.successRate}%`,
            color: 'from-purple-500 to-purple-600',
            icon: '📈',
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
            <div className="page-shell">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="heading-lg mb-2">Welcome back, {user.name}! 👋</h1>
                    <p className="text-slate-400">Here's your career journey at a glance</p>
                </div>

                {/* User Profile Card */}
                <div className="panel mb-8 p-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                            <span className="text-3xl">👤</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                            <p className="text-slate-400 mb-3">{user.email}</p>
                            <div className="flex gap-4">
                                    <button onClick={() => router.push('/resume')} className="button-secondary">View Resume</button>
                                    <button onClick={() => router.push('/tracker')} className="button-secondary">View Applications</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
                    {statCards.map((card, index) => (
                        <div key={index} className="panel p-6 hover:scale-105 transition-transform">
                            <div className={`bg-gradient-to-br ${card.color} rounded-lg p-4 mb-4 w-fit text-2xl`}>
                                {card.icon}
                            </div>
                            <p className="text-slate-400 text-sm mb-2">{card.label}</p>
                            <p className="text-3xl font-bold text-white">{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">📝 Next Steps</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-300">
                                <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</span>
                                Complete your profile with skills
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</span>
                                Upload a professional resume
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</span>
                                Start tracking your applications
                            </li>
                        </ul>
                    </div>

                    <div className="panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">🎯 Resources</h3>
                        <div className="space-y-3">
                            <button onClick={() => router.push('/resume')} className="w-full text-left button-secondary">→ Resume AI Analysis</button>
                            <button onClick={() => router.push('/tracker')} className="w-full text-left button-secondary">→ Application Tracker</button>
                            <button onClick={() => router.push('/contact')} className="w-full text-left button-secondary">→ Send Feedback</button>
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => {
                            localStorage.removeItem('token')
                            router.push('/login')
                        }}
                        className="text-slate-400 hover:text-red-400 transition text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
