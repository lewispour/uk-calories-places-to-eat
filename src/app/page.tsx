'use client';

import { useState } from 'react';
import { Shuffle, BookOpen, Sparkles, Github, Plus } from 'lucide-react';
import SpinnerView from '@/components/SpinnerView';
import WikiView from '@/components/WikiView';

type ViewMode = 'spinner' | 'wiki';

export default function Home() {
  const [activeView, setActiveView] = useState<ViewMode>('spinner');

  const navigation = [
    { id: 'spinner', label: 'Spinner', icon: Shuffle, description: 'Random pick' },
    { id: 'wiki', label: 'Browse', icon: BookOpen, description: 'Explore all' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 opacity-0 animate-fade-in-up">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] blur-lg opacity-40" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  <span className="text-[var(--text-primary)]">Calor</span>
                  <span className="gradient-text">ised</span>
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  UK Edition
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-1 sm:gap-2 opacity-0 animate-fade-in-up delay-100">
              {navigation.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveView(id as ViewMode)}
                  className={`
                    relative flex items-center justify-center gap-2
                    p-2.5 sm:px-5 sm:py-2.5 rounded-full
                    font-medium text-sm transition-all duration-300
                    ${activeView === id
                      ? 'bg-[var(--accent-primary)] text-black shadow-[0_0_30px_rgba(200,255,0,0.3)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                    }
                  `}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}

              {/* Add a Place - Desktop */}
              <a
                href="https://github.com/lewispour/calorised-places-to-eat-uk#how-to-add-a-restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  hidden sm:flex items-center gap-2 px-4 py-2.5 ml-2 rounded-full
                  text-[var(--text-muted)] hover:text-[var(--accent-primary)]
                  border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/30
                  text-sm font-medium transition-all duration-300
                "
              >
                <Plus className="w-4 h-4" />
                <span>Add Place</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Only on Spinner */}
      {activeView === 'spinner' && (
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
            <div className="opacity-0 animate-fade-in-up delay-200">
              <p className="text-[var(--accent-primary)] text-sm font-semibold uppercase tracking-[0.3em] mb-4">
                Discover Your Next Meal
              </p>
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-glow"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="text-[var(--text-primary)]">Where should </span>
                <span className="gradient-text">you eat?</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
                Spin the wheel and discover calorie-conscious options from over
                <span className="text-[var(--accent-primary)] font-semibold"> 150+ UK restaurants</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Wiki Hero */}
      {activeView === 'wiki' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="opacity-0 animate-fade-in-up">
            <p className="text-[var(--accent-primary)] text-sm font-semibold uppercase tracking-[0.3em] mb-3">
              Complete Database
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-[var(--text-primary)]">Browse </span>
              <span className="gradient-text">All Places</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
              Explore our comprehensive collection of UK restaurants with calorie information
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="opacity-0 animate-fade-in-up delay-300">
          {activeView === 'spinner' && <SpinnerView />}
          {activeView === 'wiki' && <WikiView />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Contribute CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-6 border-b border-[var(--border-subtle)]">
              <p className="text-[var(--text-secondary)] text-sm text-center">
                Know a restaurant with calorie info? Help us grow the list!
              </p>
              <a
                href="https://github.com/lewispour/calorised-places-to-eat-uk#how-to-add-a-restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 px-4 py-2 rounded-full
                  bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]
                  border border-[var(--accent-primary)]/30
                  text-sm font-medium hover:bg-[var(--accent-primary)]/20
                  transition-all duration-200
                "
              >
                <Plus className="w-4 h-4" />
                <span>Add a Place</span>
              </a>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[var(--text-muted)] text-sm">
                Helping you make informed dining choices
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/lewispour/calorised-places-to-eat-uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-muted)] text-sm">Made with</span>
                  <span className="text-[var(--accent-primary)]">♥</span>
                  <span className="text-[var(--text-muted)] text-sm">for health-conscious diners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
