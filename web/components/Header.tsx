import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter();

    const navItems = [
        { href: '/resume', label: 'Resume AI' },
        { href: '/tracker', label: 'Tracker' },
        { href: '/jobs', label: 'Jobs' },
        { href: '/interview', label: 'Interview Prep' },
        { href: '/skills', label: 'Skills' },
        { href: '/profile', label: 'Profile' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm">
            <div className="page-shell py-4">
                <div className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-500 text-sm font-semibold text-slate-900 shadow-lg">CP</span>
                        <span>
                            <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">CareerPilot AI</span>
                            <span className="block text-xs text-slate-400">Career tools that recruiters trust</span>
                        </span>
                    </Link>
                    <nav className="flex flex-wrap gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-link ${router.pathname === item.href ? 'nav-link-active' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}
