'use client';

import { useState, useEffect } from 'react';
import { Shuffle, ExternalLink, RefreshCw, ChevronDown, ChevronUp, Check, Zap } from 'lucide-react';
import { getRandomPlace, getCategoryNames, Place } from '@/lib/data';

export default function SpinnerView() {
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState<Place[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const allCategories = getCategoryNames();

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const selectAll = () => setSelectedCategories([...allCategories]);
  const clearAll = () => setSelectedCategories([]);

  const spin = () => {
    setIsSpinning(true);

    let spins = 0;
    const maxSpins = 15;
    const spinInterval = setInterval(() => {
      setCurrentPlace(getRandomPlace(selectedCategories.length > 0 ? selectedCategories : undefined));
      spins++;

      if (spins >= maxSpins) {
        clearInterval(spinInterval);
        const finalPlace = getRandomPlace(selectedCategories.length > 0 ? selectedCategories : undefined);
        setCurrentPlace(finalPlace);
        setHistory(prev => [finalPlace, ...prev.slice(0, 9)]);
        setIsSpinning(false);
      }
    }, 100);
  };

  useEffect(() => {
    setCurrentPlace(getRandomPlace());
  }, []);

  return (
    <div className="space-y-8">
      {/* Category Filter Card */}
      <div className="glass-card p-1">
        <button
          onClick={() => setShowCategoryPicker(!showCategoryPicker)}
          className="w-full flex items-center justify-between px-5 py-4 rounded-[20px] hover:bg-white/5 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[var(--accent-primary)]" />
            </div>
            <div className="text-left">
              <span className="font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                Filter Categories
              </span>
              <p className="text-sm text-[var(--text-muted)]">
                {selectedCategories.length === 0
                  ? 'All categories included'
                  : `${selectedCategories.length} of ${allCategories.length} selected`}
              </p>
            </div>
          </div>
          <div className={`w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center transition-transform duration-300 ${showCategoryPicker ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
          </div>
        </button>

        {showCategoryPicker && (
          <div className="px-5 pb-5 pt-2 border-t border-[var(--border-subtle)] mt-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[var(--text-muted)]">
                Select categories to include
              </span>
              <div className="flex gap-3">
                <button
                  onClick={selectAll}
                  className="text-xs font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                >
                  Select all
                </button>
                <span className="text-[var(--text-muted)]">•</span>
                <button
                  onClick={clearAll}
                  className="text-xs font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`
                    flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200 text-left group
                    ${selectedCategories.includes(category)
                      ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-transparent hover:bg-[var(--bg-tertiary)]/80 hover:text-[var(--text-primary)]'
                    }
                  `}
                >
                  <div className={`
                    w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all
                    ${selectedCategories.includes(category)
                      ? 'bg-[var(--accent-primary)]'
                      : 'bg-[var(--bg-secondary)] group-hover:bg-[var(--text-muted)]'
                    }
                  `}>
                    {selectedCategories.includes(category) && (
                      <Check className="w-3 h-3 text-black" />
                    )}
                  </div>
                  <span className="truncate capitalize">{category}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Spinner Card */}
      <div className="glass-card p-8 sm:p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--accent-secondary)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        {currentPlace && (
          <div className={`relative text-center transition-all duration-500 ${
            isSpinning ? 'opacity-60 scale-95' : 'opacity-100 scale-100'
          }`}>
            {/* Spinner Orb */}
            <div className="mb-10 relative inline-block">
              <div className={`
                w-36 h-36 sm:w-44 sm:h-44 rounded-full
                bg-gradient-to-br from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)]
                flex items-center justify-center
                shadow-[0_0_60px_rgba(200,255,0,0.3)]
                ${isSpinning ? 'animate-spin' : 'animate-pulse-glow'}
              `}>
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                  <Shuffle className={`w-12 h-12 sm:w-14 sm:h-14 text-[var(--accent-primary)] transition-transform duration-300 ${isSpinning ? '' : 'hover:scale-110'}`} />
                </div>
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] blur-2xl opacity-30 -z-10 scale-110" />
            </div>

            {/* Result */}
            <h3
              className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {currentPlace.name}
            </h3>

            <div className="flex items-center justify-center flex-wrap gap-3 mb-8">
              <span className="category-pill">
                {currentPlace.category}
              </span>
              {currentPlace.notes && (
                <span className="text-sm text-[var(--text-muted)] italic">
                  {currentPlace.notes}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={spin}
                disabled={isSpinning}
                className="btn-primary"
              >
                <RefreshCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'Spinning...' : 'Spin Again'}</span>
              </button>

              <a
                href={currentPlace.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Menu</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-[var(--accent-secondary)]" />
            </div>
            <h3
              className="text-lg font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Recent Spins
            </h3>
          </div>

          <div className="space-y-2">
            {history.map((place, index) => (
              <div
                key={index}
                className="
                  flex items-center justify-between p-4 rounded-xl
                  bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)]
                  border border-transparent hover:border-[var(--border-subtle)]
                  transition-all duration-300 group
                "
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="
                    w-8 h-8 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center
                    text-sm font-bold text-[var(--text-muted)]
                  ">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-[var(--text-primary)] capitalize">
                      {place.name}
                    </p>
                    <p className="text-sm text-[var(--text-muted)] capitalize">
                      {place.category}
                    </p>
                  </div>
                </div>
                <a
                  href={place.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    p-2.5 rounded-xl text-[var(--text-muted)]
                    hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10
                    transition-all duration-200
                    opacity-0 group-hover:opacity-100
                  "
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
