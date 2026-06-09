import { useState } from 'react'

interface InterviewQuestion {
    id: string
    category: string
    question: string
    difficulty: 'easy' | 'medium' | 'hard'
    tips: string[]
}

const interviewQuestions: InterviewQuestion[] = [
    {
        id: '1',
        category: 'Behavioral',
        question: 'Tell me about a time you had to work with a difficult team member. How did you handle it?',
        difficulty: 'medium',
        tips: [
            'Use the STAR method: Situation, Task, Action, Result',
            'Focus on what you learned from the experience',
            'Show empathy and communication skills',
            'Highlight the positive outcome',
        ],
    },
    {
        id: '2',
        category: 'Technical',
        question: 'Explain the difference between synchronous and asynchronous programming.',
        difficulty: 'medium',
        tips: [
            'Explain with clear examples (e.g., callbacks, promises, async/await)',
            'Discuss when to use each approach',
            'Mention real-world use cases',
            'Show knowledge of performance implications',
        ],
    },
    {
        id: '3',
        category: 'Behavioral',
        question: 'Describe a project you led. What challenges did you face?',
        difficulty: 'medium',
        tips: [
            'Pick a project that showcases your skills',
            'Explain your role clearly',
            'Discuss specific challenges and solutions',
            'Quantify results when possible',
        ],
    },
    {
        id: '4',
        category: 'Technical',
        question: 'What is a REST API? How would you design one?',
        difficulty: 'easy',
        tips: [
            'Explain the key principles: Client-Server, Stateless, Resource-Based',
            'Discuss HTTP methods: GET, POST, PUT, DELETE',
            'Mention status codes and error handling',
            'Show familiarity with best practices',
        ],
    },
    {
        id: '5',
        category: 'Behavioral',
        question: 'How do you stay updated with new technologies and trends?',
        difficulty: 'easy',
        tips: [
            'Mention specific resources: blogs, podcasts, courses',
            'Talk about projects where you used new tech',
            'Show commitment to continuous learning',
            'Be specific about recent technologies you learned',
        ],
    },
    {
        id: '6',
        category: 'Technical',
        question: 'How would you optimize a slow database query?',
        difficulty: 'hard',
        tips: [
            'Discuss indexing and query optimization',
            'Mention caching strategies',
            'Talk about query analysis tools',
            'Discuss normalization vs. denormalization',
            'Provide a specific example if possible',
        ],
    },
    {
        id: '7',
        category: 'Salary & Expectations',
        question: 'What are your salary expectations?',
        difficulty: 'medium',
        tips: [
            'Research industry standards for your location and level',
            'Consider benefits and growth opportunities',
            'Provide a range rather than a fixed number',
            'Express flexibility based on the full package',
        ],
    },
    {
        id: '8',
        category: 'Behavioral',
        question: 'Why do you want to work for our company?',
        difficulty: 'easy',
        tips: [
            'Research the company thoroughly beforehand',
            'Mention specific products or initiatives you admire',
            'Align company values with your own',
            'Show genuine interest and enthusiasm',
        ],
    },
]

export default function InterviewPrep() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedDifficulty, setSelectedDifficulty] = useState('all')
    const [practiceMode, setPracticeMode] = useState(false)
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
    const [answers, setAnswers] = useState<{ [key: string]: string }>({})

    const categories = ['all', ...new Set(interviewQuestions.map((q) => q.category))]
    const difficulties = ['all', 'easy', 'medium', 'hard']

    const filteredQuestions = interviewQuestions.filter((q) => {
        const matchCategory = selectedCategory === 'all' || q.category === selectedCategory
        const matchDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty
        return matchCategory && matchDifficulty
    })

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'text-green-400'
            case 'medium':
                return 'text-yellow-400'
            case 'hard':
                return 'text-red-400'
            default:
                return 'text-slate-400'
        }
    }

    const getDifficultyBg = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'bg-green-500/20'
            case 'medium':
                return 'bg-yellow-500/20'
            case 'hard':
                return 'bg-red-500/20'
            default:
                return 'bg-slate-500/20'
        }
    }

    if (practiceMode && filteredQuestions.length > 0) {
        const currentQuestion = filteredQuestions[currentQuestionIdx]

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
                <div className="page-shell max-w-3xl">
                    {/* Practice Header */}
                    <div className="mb-8">
                            <button onClick={() => setPracticeMode(false)} className="mb-4 text-emerald-400 hover:text-emerald-300 transition text-sm flex items-center gap-2">← Back to Questions</button>
                        <div className="flex justify-between items-center">
                            <h1 className="heading-lg">Interview Practice</h1>
                            <p className="text-slate-400">
                                Question {currentQuestionIdx + 1} of {filteredQuestions.length}
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all"
                            style={{ width: `${((currentQuestionIdx + 1) / filteredQuestions.length) * 100}%` }}
                        ></div>
                    </div>

                    {/* Question Card */}
                    <div className="panel p-8 mb-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <p className="text-sm text-slate-400 mb-2">{currentQuestion.category}</p>
                                <h2 className="text-2xl font-bold text-white">{currentQuestion.question}</h2>
                            </div>
                            <span className={`px-4 py-2 rounded-lg ${getDifficultyBg(currentQuestion.difficulty)} ${getDifficultyColor(currentQuestion.difficulty)} font-semibold`}>
                                {currentQuestion.difficulty}
                            </span>
                        </div>

                        {/* Tips */}
                        <div className="mb-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                            <p className="text-sm font-semibold text-slate-300 mb-3">💡 Tips for answering:</p>
                            <ul className="space-y-2">
                                {currentQuestion.tips.map((tip, index) => (
                                    <li key={index} className="text-slate-400 text-sm flex gap-2">
                                        <span className="text-emerald-400">•</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Answer Input */}
                        <div>
                            <label className="label">Your Answer</label>
                            <textarea
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) =>
                                    setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
                                }
                                placeholder="Practice your answer here. Think out loud and structure your response..."
                                className="input min-h-32"
                            />
                            <p className="text-xs text-slate-400 mt-2">
                                {(answers[currentQuestion.id] || '').length} characters
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
                            disabled={currentQuestionIdx === 0}
                            className="flex-1 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white transition"
                        >
                            ← Previous
                        </button>

                        {currentQuestionIdx === filteredQuestions.length - 1 ? (
                            <button
                                onClick={() => setPracticeMode(false)}
                                className="flex-1 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
                            >
                                Finish Practice
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                                className="flex-1 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
                            >
                                Next →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="heading-lg mb-2">🎤 Interview Preparation</h1>
                    <p className="text-slate-400">Practice common interview questions and prepare your responses</p>
                </div>

                {/* Filters */}
                <div className="panel p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="input"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Categories' : cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="label">Difficulty</label>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="input"
                            >
                                {difficulties.map((diff) => (
                                    <option key={diff} value={diff}>
                                        {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button onClick={() => setPracticeMode(true)} disabled={filteredQuestions.length === 0} className="mt-4 w-full button-primary">Start Practice Mode ({filteredQuestions.length} questions)</button>
                </div>

                {/* Questions List */}
                {filteredQuestions.length > 0 ? (
                    <div className="space-y-4">
                        {filteredQuestions.map((question, index) => (
                            <div key={question.id} className="panel p-6 hover:scale-[1.02] transition-transform">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <p className="text-xs muted mb-1">Q{index + 1} • {question.category}</p>
                                        <h3 className="text-lg font-bold text-white">{question.question}</h3>
                                    </div>
                                    <span className={`px-3 py-1 rounded text-sm font-semibold ${getDifficultyBg(question.difficulty)} ${getDifficultyColor(question.difficulty)}`}>
                                        {question.difficulty}
                                    </span>
                                </div>

                                <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                                    <p className="text-xs font-semibold text-slate-400 mb-2">Quick Tips:</p>
                                    <ul className="space-y-1">
                                        {question.tips.slice(0, 2).map((tip, idx) => (
                                            <li key={idx} className="text-sm text-slate-300 flex gap-2">
                                                <span className="text-emerald-400">•</span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="panel text-center p-12">
                        <p className="text-3xl mb-4">🔍</p>
                        <p className="text-white font-semibold mb-2">No questions found</p>
                        <p className="text-slate-400">Try adjusting your filters</p>
                    </div>
                )}

                {/* Resources */}
                <div className="mt-12">
                    <h2 className="heading-lg mb-6">📚 Interview Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="panel p-6">
                            <div className="text-3xl mb-4">🎯</div>
                            <h3 className="text-lg font-bold text-white mb-2">STAR Method</h3>
                            <p className="text-slate-400 text-sm">
                                <strong>S</strong>ituation - <strong>T</strong>ask - <strong>A</strong>ction - <strong>R</strong>esult. Use this framework for behavioral questions.
                            </p>
                        </div>

                        <div className="panel p-6">
                            <div className="text-3xl mb-4">🧠</div>
                            <h3 className="text-lg font-bold text-white mb-2">Technical Preparation</h3>
                            <p className="text-slate-400 text-sm">
                                Review data structures, algorithms, system design, and be ready to code. Practice on LeetCode and HackerRank.
                            </p>
                        </div>

                        <div className="panel p-6">
                            <div className="text-3xl mb-4">💬</div>
                            <h3 className="text-lg font-bold text-white mb-2">Mock Interviews</h3>
                            <p className="text-slate-400 text-sm">
                                Practice with friends, use Pramp or Interviewing.io for mock interviews with real people.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
