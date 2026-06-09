import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = typeof window !== 'undefined' && localStorage.getItem('token')
    setIsAuthenticated(!!t)
  }, [])

  const features = [
    {
      icon: '📝',
      title: 'Resume AI Analysis',
      description: 'Paste your resume and get recruiter-focused improvement suggestions instantly.',
      href: '/resume',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: '📋',
      title: 'Application Tracker',
      description: 'Track all your job applications, statuses, and pipeline progress in one place.',
      href: '/tracker',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: '🔍',
      title: 'Job Opportunities',
      description: 'Discover job matches based on your skills with competitive salary insights.',
      href: '/jobs',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: '🎤',
      title: 'Interview Prep',
      description: 'Practice common interview questions with STAR method tips and structured answers.',
      href: '/interview',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: '🎯',
      title: 'Skill Recommendations',
      description: 'Get personalized skill recommendations based on job descriptions and market demand.',
      href: '/skills',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: '👤',
      title: 'Professional Profile',
      description: 'Build your portfolio with skills, experience, and projects for recruiters to discover.',
      href: '/profile',
      color: 'from-red-500 to-red-600',
    },
  ]

  const stats = [
    { value: '10K+', label: 'Job Matches', icon: '💼' },
    { value: '98%', label: 'Platform Satisfaction', icon: '⭐' },
    { value: '50+', label: 'Interview Questions', icon: '🎤' },
    { value: '24/7', label: 'Support Available', icon: '🚀' },
  ]

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:py-32">
        <div className="page-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <p className="text-emerald-400 font-semibold mb-3">🚀 Career Management Platform</p>
                <h1 className="heading-xl text-white mb-4">
                  Land Your Dream Job with CareerPilot AI
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Your all-in-one platform to manage applications, prepare for interviews, improve your resume, and showcase your skills to recruiters.
                </p>
              </div>

              <div className="flex gap-4 flex-wrap">
                {!mounted || !isAuthenticated ? (
                  <>
                    <button onClick={() => router.push('/register')} className="button-primary">Get Started Free →</button>
                    <button onClick={() => router.push('/login')} className="button-secondary">Sign In</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => router.push('/dashboard')} className="button-primary">View Dashboard →</button>
                    <button onClick={() => router.push('/jobs')} className="button-secondary">Browse Jobs</button>
                  </>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Feature Preview */}
            <div className="space-y-4 hidden lg:block">
              <div className="p-6 panel">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="text-white font-bold">Track Progress</p>
                    <p className="text-xs text-slate-400">15 applications submitted</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="p-6 panel">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🎯</span>
                  <p className="text-white font-bold">Match Score: 89%</p>
                </div>
                <p className="text-sm text-slate-400">Senior Frontend Developer at Google</p>
              </div>

              <div className="p-6 panel">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">📈</span>
                  <p className="text-white font-bold">Improve Skills</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs">React</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">TypeScript</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">+3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="page-shell">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-white mb-4">Everything You Need to Land Your Dream Job</h2>
            <p className="text-slate-400 text-lg">Six powerful tools designed for career success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="panel p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`inline-block p-4 rounded-lg bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition">
                  {feature.title}
                </h3>
                <p className="text-slate-300 mb-4">{feature.description}</p>
                <span className="text-emerald-400 font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  Explore → 
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="page-shell">
          <h2 className="heading-lg text-white mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Create Account', desc: 'Sign up and build your profile' },
              { step: '2', title: 'Analyze Resume', desc: 'Get AI-powered improvement tips' },
              { step: '3', title: 'Find Jobs', desc: 'Browse opportunities matched to you' },
              { step: '4', title: 'Track & Win', desc: 'Manage applications and land offers' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-white mb-8">Why Recruiters Love CareerPilot AI</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '✨', title: 'Polished Profiles', desc: 'Candidates showcase their best selves' },
              { icon: '📊', title: 'Quality Applications', desc: 'Better-prepared candidates from the start' },
              { icon: '🎯', title: 'Serious Seekers', desc: 'Actively managed career progress' },
            ].map((item, i) => (
              <div key={i} className="panel p-6">
                <p className="text-4xl mb-3">{item.icon}</p>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="page-shell">
          <div className="panel p-12 text-center bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
            <h2 className="heading-lg text-white mb-6">Ready to Take Control of Your Career?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who are landing their dream roles faster with CareerPilot AI.
            </p>
            {!mounted || !isAuthenticated ? (
              <button onClick={() => router.push('/register')} className="button-primary inline-block">Start Your Journey Now →</button>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
