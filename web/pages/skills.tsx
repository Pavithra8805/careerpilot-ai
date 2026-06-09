import { useState } from 'react'

interface SkillRecommendation {
    skill: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    demand: number
    resources: string[]
    reason: string
}

export default function SkillsRecommendation() {
    const [jobDescription, setJobDescription] = useState('')
    const [userSkills, setUserSkills] = useState('')
    const [recommendations, setRecommendations] = useState<SkillRecommendation[]>([])
    const [loading, setLoading] = useState(false)
    const [analyzed, setAnalyzed] = useState(false)

    const recommendedSkillsDB: SkillRecommendation[] = [
        {
            skill: 'React',
            level: 'Intermediate',
            demand: 95,
            resources: ['React Official Docs', 'freeCodeCamp React Tutorial', 'Udemy React Course'],
            reason: 'Most in-demand frontend framework. Essential for modern web development.',
        },
        {
            skill: 'TypeScript',
            level: 'Intermediate',
            demand: 88,
            resources: ['TypeScript Handbook', 'Scrimba TypeScript Course', 'Type Challenges'],
            reason: 'Adds type safety to JavaScript. Highly sought by employers.',
        },
        {
            skill: 'Node.js',
            level: 'Intermediate',
            demand: 92,
            resources: ['Node.js Official Docs', 'Udemy Node.js Course', 'Codecademy Node.js'],
            reason: 'Essential for backend development. Required for full-stack roles.',
        },
        {
            skill: 'AWS',
            level: 'Intermediate',
            demand: 85,
            resources: ['AWS Certified Cloud Practitioner', 'CloudAcademy AWS', 'Linux Academy AWS'],
            reason: 'Cloud infrastructure is crucial. AWS is the market leader.',
        },
        {
            skill: 'Docker',
            level: 'Intermediate',
            demand: 78,
            resources: ['Docker Official Tutorial', 'Udemy Docker Course', 'freeCodeCamp Docker'],
            reason: 'Containerization is industry standard. Essential for DevOps.',
        },
        {
            skill: 'GraphQL',
            level: 'Beginner',
            demand: 72,
            resources: ['Apollo GraphQL Docs', 'Udemy GraphQL Course', 'How to GraphQL Tutorial'],
            reason: 'Modern API standard. Growing demand in tech companies.',
        },
        {
            skill: 'Python',
            level: 'Intermediate',
            demand: 90,
            resources: ['Python.org Docs', 'Codecademy Python', 'Udemy Python Course'],
            reason: 'Versatile language. Essential for data science, automation, and backend.',
        },
        {
            skill: 'SQL',
            level: 'Intermediate',
            demand: 96,
            resources: ['SQL Tutorial w3schools', 'LeetCode SQL', 'Udemy SQL Masterclass'],
            reason: 'Most database jobs require SQL. Fundamental skill for any developer.',
        },
        {
            skill: 'System Design',
            level: 'Advanced',
            demand: 85,
            resources: ['System Design Interview', 'Educative System Design', 'Designing Data-Intensive Apps'],
            reason: 'Required for senior roles. Demonstrates architectural thinking.',
        },
        {
            skill: 'Git & GitHub',
            level: 'Intermediate',
            demand: 98,
            resources: ['Git Official Docs', 'GitHub Skills', 'Atlassian Git Tutorial'],
            reason: 'Essential for collaboration. Required in virtually every tech role.',
        },
    ]

    async function analyzeSkills() {
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
            const userSkillsList = userSkills
                .split(',')
                .map((s) => s.trim().toLowerCase())
                .filter((s) => s)

            const filtered = recommendedSkillsDB.filter((s) => !userSkillsList.includes(s.skill.toLowerCase()))

            // Score recommendations based on job description
            const scored = filtered
                .map((skill) => ({
                    ...skill,
                    score:
                        skill.demand +
                        (jobDescription.toLowerCase().includes(skill.skill.toLowerCase()) ? 30 : 0),
                }))
                .sort((a, b) => b.score - a.score)

            setRecommendations(scored.slice(0, 6))
            setAnalyzed(true)
            setLoading(false)
        }, 1000)
    }

    const getDemandColor = (demand: number) => {
        if (demand >= 90) return 'text-red-400'
        if (demand >= 80) return 'text-orange-400'
        if (demand >= 70) return 'text-yellow-400'
        return 'text-slate-400'
    }

    const getLevelBadgeColor = (level: string) => {
        switch (level) {
            case 'Beginner':
                return 'bg-green-500/20 text-green-300'
            case 'Intermediate':
                return 'bg-blue-500/20 text-blue-300'
            case 'Advanced':
                return 'bg-purple-500/20 text-purple-300'
            default:
                return 'bg-slate-500/20 text-slate-300'
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
            <div className="page-shell max-w-4xl">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="heading-lg mb-2">🎯 Skill Recommendations</h1>
                    <p className="text-slate-400">Discover which skills will make you most competitive</p>
                </div>

                {/* Input Section */}
                <div className="panel p-8 mb-8">
                    <div className="mb-6">
                        <label className="label">
                            Paste a Job Description
                            <p className="text-xs font-normal text-slate-400">We'll analyze the requirements</p>
                        </label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste job description here..."
                            className="input min-h-32"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="label">
                            Your Current Skills
                            <p className="text-xs font-normal text-slate-400">Separate with commas</p>
                        </label>
                        <input
                            type="text"
                            value={userSkills}
                            onChange={(e) => setUserSkills(e.target.value)}
                            placeholder="e.g., React, JavaScript, CSS"
                            className="input"
                        />
                    </div>

                    <button onClick={analyzeSkills} disabled={loading || !jobDescription} className="w-full button-primary">{loading ? 'Analyzing...' : 'Get Recommendations'}</button>
                </div>

                {/* Recommendations */}
                {analyzed && (
                    <>
                        <div className="mb-8">
                            <h2 className="heading-lg mb-6">📚 Recommended Skills to Learn</h2>

                            {recommendations.length > 0 ? (
                                <div className="space-y-4">
                                    {recommendations.map((rec, index) => (
                                        <div key={index} className="panel p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-2">{rec.skill}</h3>
                                                    <p className="text-slate-400 mb-3">{rec.reason}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`inline-block px-3 py-1 rounded text-sm font-semibold ${getLevelBadgeColor(rec.level)}`}>
                                                        {rec.level}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="flex justify-between mb-2">
                                                    <p className="text-sm text-slate-400">Market Demand</p>
                                                    <p className={`text-sm font-bold ${getDemandColor(rec.demand)}`}>
                                                        {rec.demand}%
                                                    </p>
                                                </div>
                                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${
                                                            rec.demand >= 90
                                                                ? 'bg-red-500'
                                                                : rec.demand >= 80
                                                                  ? 'bg-orange-500'
                                                                  : rec.demand >= 70
                                                                    ? 'bg-yellow-500'
                                                                    : 'bg-slate-500'
                                                        }`}
                                                        style={{ width: `${rec.demand}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-slate-300 mb-2">📖 Learning Resources:</p>
                                                <ul className="space-y-1">
                                                    {rec.resources.map((resource, idx) => (
                                                        <li key={idx} className="text-sm text-slate-400 flex gap-2">
                                                            <span className="text-emerald-400">→</span>
                                                            {resource}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="panel text-center p-12">
                                    <p className="text-slate-400">You already have the recommended skills! 🎉</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Tips Section */}
                {!analyzed && (
                    <div className="space-y-6 mt-12">
                        <h2 className="heading-lg mb-6">💡 How to Use This Tool</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="panel p-6">
                                <div className="text-3xl mb-4">1️⃣</div>
                                <h3 className="text-lg font-bold text-white mb-2">Find a Job</h3>
                                <p className="text-slate-400 text-sm">Find a job posting that interests you on LinkedIn, Indeed, or other job boards.</p>
                            </div>

                            <div className="panel p-6">
                                <div className="text-3xl mb-4">2️⃣</div>
                                <h3 className="text-lg font-bold text-white mb-2">Paste Description</h3>
                                <p className="text-slate-400 text-sm">Copy the job description and paste it into the input field above.</p>
                            </div>

                            <div className="panel p-6">
                                <div className="text-3xl mb-4">3️⃣</div>
                                <h3 className="text-lg font-bold text-white mb-2">Get Recommendations</h3>
                                <p className="text-slate-400 text-sm">We'll analyze and suggest skills that will make you competitive for the role.</p>
                            </div>
                        </div>

                        <div className="panel p-6 bg-slate-800/50 mt-8">
                            <h3 className="text-lg font-bold text-white mb-4">📊 Market Insights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Most Demanded Skill</p>
                                    <p className="text-lg font-bold text-white">SQL</p>
                                    <p className="text-xs text-slate-400">96% demand</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Rising Trend</p>
                                    <p className="text-lg font-bold text-white">TypeScript</p>
                                    <p className="text-xs text-slate-400">88% demand</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Career Booster</p>
                                    <p className="text-lg font-bold text-white">System Design</p>
                                    <p className="text-xs text-slate-400">85% for seniors</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
