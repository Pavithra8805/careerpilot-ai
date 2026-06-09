import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface UserProfile {
    id: string
    name: string
    email: string
    title?: string
    bio?: string
    skills?: string[]
    experience?: string
    education?: string
    projects?: string
}

export default function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<Partial<UserProfile>>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [saveStatus, setSaveStatus] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetchProfile()
    }, [])

    async function fetchProfile() {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            const res = await fetch('http://localhost:3001/api/protected', {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!res.ok) throw new Error('Failed to fetch profile')

            const data = await res.json()
            const profileData: UserProfile = {
                id: data.user?.id || '',
                name: data.user?.name || '',
                email: data.user?.email || '',
                title: data.user?.title || 'Career Seeker',
                bio: data.user?.bio || '',
                skills: data.user?.skills || [],
                experience: data.user?.experience || '',
                education: data.user?.education || '',
                projects: data.user?.projects || '',
            }
            setProfile(profileData)
            setFormData(profileData)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load profile')
        } finally {
            setLoading(false)
        }
    }

    async function saveProfile() {
        try {
            setSaveStatus('Saving...')
            const token = localStorage.getItem('token')
            if (!token) {
                setSaveStatus('Not authenticated')
                return
            }
            const res = await fetch('http://localhost:3001/auth/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(formData),
            })
            if (!res.ok) throw new Error('Failed to save')
            const data = await res.json()
            setProfile({ ...(profile || {}), ...(formData as UserProfile), ...(data.user || {}) })
            setSaveStatus('Profile updated successfully!')
            setTimeout(() => setSaveStatus(''), 3000)
        } catch (err) {
            setSaveStatus('Failed to save profile')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
                    <p className="mt-4 text-slate-300">Loading profile...</p>
                </div>
            </div>
        )
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="panel text-center p-8">
                    <p className="text-red-400 mb-4">{error || 'Failed to load profile'}</p>
                    <button onClick={() => router.push('/dashboard')} className="button-primary">
                        Go to Dashboard
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
            <div className="page-shell max-w-4xl">
                {/* Header */}
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="heading-lg mb-2">Your Profile</h1>
                        <p className="text-slate-400">Build your professional presence for recruiters</p>
                    </div>
                    <button
                        onClick={() => {
                            if (isEditing) {
                                saveProfile()
                            }
                            setIsEditing(!isEditing)
                        }}
                        className={isEditing ? 'button-primary' : 'button-secondary'}
                    >
                        {isEditing ? 'Save Profile' : 'Edit Profile'}
                    </button>
                </div>

                {/* Status Messages */}
                {saveStatus && (
                    <div className={`mb-6 p-4 rounded-lg ${
                        saveStatus.includes('successfully')
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-red-500/20 text-red-300'
                    }`}>
                        {saveStatus}
                    </div>
                )}

                {/* Profile Header Card */}
                <div className="panel p-8 mb-8">
                    <div className="flex items-center gap-8 mb-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                            <span className="text-5xl">👤</span>
                        </div>
                        <div className="flex-1">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={formData.name || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="input text-3xl font-bold mb-2"
                                        placeholder="Full Name"
                                    />
                                    <input
                                        type="text"
                                        value={formData.title || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        className="input text-slate-300 mb-2"
                                        placeholder="Job Title (e.g., Full Stack Developer)"
                                    />
                                    <p className="text-slate-400">{profile.email}</p>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-bold text-white mb-1">{profile.name}</h2>
                                    <p className="text-emerald-400 text-lg mb-2">{profile.title || 'Career Seeker'}</p>
                                    <p className="text-slate-400">{profile.email}</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="label">Professional Summary</label>
                        {isEditing ? (
                            <textarea
                                value={formData.bio || ''}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Write a brief professional summary..."
                                className="input min-h-24"
                            />
                        ) : (
                            <p className="text-slate-300 mt-2">
                                {profile.bio || 'Add your professional summary to help recruiters understand your background.'}
                            </p>
                        )}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="panel p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-6">💼 Skills</h3>
                    {isEditing ? (
                        <>
                            <textarea
                                value={(formData.skills || []).join(', ')}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        skills: e.target.value.split(',').map((s) => s.trim()),
                                    })
                                }
                                placeholder="e.g., React, Node.js, TypeScript, PostgreSQL, AWS"
                                className="input min-h-20 mb-4"
                            />
                            <p className="text-xs text-slate-400">Separate skills with commas</p>
                        </>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {profile.skills && profile.skills.length > 0 ? (
                                profile.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-slate-400">Add your skills to showcase your expertise</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Experience Section */}
                <div className="panel p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">📍 Experience</h3>
                    {isEditing ? (
                        <textarea
                            value={formData.experience || ''}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            placeholder="Describe your professional experience..."
                            className="input min-h-24"
                        />
                    ) : (
                        <p className="text-slate-300">
                            {profile.experience || 'Add your work experience to help recruiters see your background.'}
                        </p>
                    )}
                </div>

                {/* Education Section */}
                <div className="panel p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">🎓 Education</h3>
                    {isEditing ? (
                        <textarea
                            value={formData.education || ''}
                            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                            placeholder="e.g., B.S. in Computer Science, Stanford University, 2023"
                            className="input min-h-20"
                        />
                    ) : (
                        <p className="text-slate-300">
                            {profile.education || 'Add your education background.'}
                        </p>
                    )}
                </div>

                {/* Projects Section */}
                <div className="panel p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">🚀 Projects & Portfolio</h3>
                    {isEditing ? (
                        <textarea
                            value={formData.projects || ''}
                            onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                            placeholder="Share your notable projects, GitHub repos, or portfolio links..."
                            className="input min-h-24"
                        />
                    ) : (
                        <p className="text-slate-300">
                            {profile.projects || 'Showcase your projects and portfolio work here.'}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex-1 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition"
                    >
                        Back to Dashboard
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="flex-1 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition"
                    >
                        Download as PDF
                    </button>
                </div>

                {/* Recruiter Tips */}
                <div className="panel p-6 bg-slate-800/50">
                    <h4 className="text-lg font-bold text-white mb-4">💡 Tips for Recruiters</h4>
                    <ul className="space-y-2 text-slate-300">
                        <li>✓ Complete all sections for a stronger profile</li>
                        <li>✓ Use specific keywords related to your industry</li>
                        <li>✓ Link to your GitHub or portfolio website</li>
                        <li>✓ Keep your profile updated with recent achievements</li>
                        <li>✓ Highlight your unique skills and accomplishments</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
