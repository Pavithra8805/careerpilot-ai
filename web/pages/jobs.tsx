import { useState, useEffect } from 'react'
import LoadingSkeleton from '../components/LoadingSkeleton'

interface JobListing {
    id: string
    title: string
    company: string
    location: string
    salary: string
    match: number
    skills: string[]
    description: string
}

export default function JobSearch() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('all')
    const [minMatch, setMinMatch] = useState(70)
    const [jobs, setJobs] = useState<JobListing[]>([])
    const [loadingJobs, setLoadingJobs] = useState(true)
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    useEffect(() => {
        fetchJobs()
    }, [])

    async function fetchJobs() {
        setLoadingJobs(true)
        try {
            const res = await fetch('http://localhost:3001/jobs')
            if (res.ok) {
                const data = await res.json()
                const items = data && data.items ? data.items : data
                if (Array.isArray(items)) setJobs(items)
                else setJobs([])
            }
        } catch (err) {
            console.error('Failed to load jobs', err)
            // fallback: keep jobs empty
        } finally {
            setLoadingJobs(false)
        }
    }

    async function applyJob(job: JobListing) {
        setActionLoading(job.id)
        try {
            const res = await fetch('http://localhost:3001/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ company: job.company, role: job.title, status: 'Applied' }),
            })
            if (res.ok) {
                alert('Application saved to your tracker.')
            } else {
                alert('Failed to apply')
            }
        } catch (err) {
            alert('Network error')
        } finally {
            setActionLoading(null)
        }
    }

    async function saveJob(job: JobListing) {
        setActionLoading(job.id)
        try {
            const res = await fetch('http://localhost:3001/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ company: job.company, role: job.title, status: 'Saved' }),
            })
            if (res.ok) {
                alert('Job saved to your tracker.')
            } else {
                alert('Failed to save job')
            }
        } catch (err) {
            alert('Network error')
        } finally {
            setActionLoading(null)
        }
    }

    const filteredJobs = jobs
        .filter((job) => {
            const matchesSearch =
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesLocation = selectedLocation === 'all' || job.location.includes(selectedLocation)
            const matchesSkill = job.match >= minMatch
            return matchesSearch && matchesLocation && matchesSkill
        })
        .sort((a, b) => b.match - a.match)

    const getMatchColor = (match: number) => {
        if (match >= 90) return 'text-emerald-400'
        if (match >= 80) return 'text-blue-400'
        if (match >= 70) return 'text-yellow-400'
        return 'text-slate-400'
    }

    const getMatchBg = (match: number) => {
        if (match >= 90) return 'bg-emerald-500/20'
        if (match >= 80) return 'bg-blue-500/20'
        if (match >= 70) return 'bg-yellow-500/20'
        return 'bg-slate-500/20'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="heading-lg mb-2">🔍 Job Opportunities</h1>
                    <p className="text-slate-400">Discover roles matched to your skills and interests</p>
                </div>

                {/* Search & Filters */}
                <div className="panel p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="label">Search by Job or Company</label>
                            <input
                                type="text"
                                placeholder="e.g., Frontend Developer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input"
                            />
                        </div>

                        <div>
                            <label className="label">Location</label>
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="input"
                            >
                                <option value="all">All Locations</option>
                                <option value="CA">California</option>
                                <option value="WA">Washington</option>
                                <option value="TX">Texas</option>
                                <option value="NY">New York</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        <div>
                            <label className="label">Minimum Match Score: {minMatch}%</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={minMatch}
                                onChange={(e) => setMinMatch(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="text-sm text-slate-400">
                        Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} matching your criteria
                    </div>
                </div>

                {/* Jobs List */}
                {loadingJobs ? (
                    <div className="space-y-4">
                        <div className="panel p-6"><LoadingSkeleton lines={6} /></div>
                        <div className="panel p-6"><LoadingSkeleton lines={6} /></div>
                    </div>
                ) : filteredJobs.length > 0 ? (
                    <div className="space-y-4">
                        {filteredJobs.map((job) => (
                            <div key={job.id} className="panel p-6 hover:scale-[1.02] transition-transform">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                                        <p className="text-emerald-400 font-medium">{job.company}</p>
                                        <p className="text-slate-400 text-sm">{job.location}</p>
                                    </div>

                                    <div className={`text-right ${getMatchColor(job.match)}`}>
                                        <div className={`inline-block px-4 py-2 rounded-lg ${getMatchBg(job.match)}`}>
                                            <div className="text-2xl font-bold">{job.match}%</div>
                                            <div className="text-xs">Match</div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-300 mb-4">{job.description}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-slate-400 mb-2">💰 Salary Range</p>
                                        <p className="text-white font-semibold">{job.salary}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400 mb-2">Required Skills</p>
                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block px-3 py-1 bg-slate-700/50 text-slate-300 rounded text-xs"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={() => applyJob(job)} disabled={actionLoading === job.id} className="flex-1 button-primary">{actionLoading === job.id ? 'Applying...' : 'Apply Now'}</button>
                                    <button onClick={() => saveJob(job)} disabled={actionLoading === job.id} className="flex-1 button-secondary">{actionLoading === job.id ? 'Saving...' : 'Save Job'}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="panel text-center p-12">
                        <p className="text-3xl mb-4">🔍</p>
                        <p className="text-white font-semibold mb-2">No jobs found</p>
                        <p className="text-slate-400">Try adjusting your filters or search terms</p>
                    </div>
                )}

                {/* Recommendations */}
                <div className="mt-12">
                    <h2 className="heading-lg mb-6">📚 Tips for Job Success</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="panel p-6">
                            <div className="text-3xl mb-4">📄</div>
                            <h3 className="text-lg font-bold text-white mb-2">Optimize Your Resume</h3>
                            <p className="text-slate-400 text-sm">
                                Tailor your resume to match the job description. Include relevant keywords and quantify achievements.
                            </p>
                        </div>

                        <div className="panel p-6">
                            <div className="text-3xl mb-4">🤝</div>
                            <h3 className="text-lg font-bold text-white mb-2">Network & Connect</h3>
                            <p className="text-slate-400 text-sm">
                                Reach out to people at target companies. Many jobs are filled through referrals, not job boards.
                            </p>
                        </div>

                        <div className="panel p-6">
                            <div className="text-3xl mb-4">💼</div>
                            <h3 className="text-lg font-bold text-white mb-2">Build Your Portfolio</h3>
                            <p className="text-slate-400 text-sm">
                                Show your skills through real projects. GitHub contributions and side projects stand out to recruiters.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
