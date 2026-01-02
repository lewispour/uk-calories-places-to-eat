'use client';

import { useState, useMemo } from 'react';
import { Search, Grid, List, ExternalLink, MapPin, TrendingUp, Layers, X, SlidersHorizontal } from 'lucide-react';
import { parsePlacesData, Place } from '@/lib/data';

export default function WikiView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = parsePlacesData();

  const allPlaces = useMemo(() => {
    return categories.flatMap(cat => cat.places);
  }, [categories]);

  const filteredPlaces = useMemo(() => {
    let filtered = allPlaces;

    if (selectedCategory) {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(place =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (place.notes && place.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [allPlaces, searchTerm, selectedCategory]);

  const categoryStats = useMemo(() => {
    const stats = new Map<string, number>();
    categories.forEach(category => {
      stats.set(category.name, category.places.length);
    });
    return stats;
  }, [categories]);

  return (
    <div className="space-y-6">
      {/* Search & Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-premium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <X className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`
              lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200
              ${showMobileFilters || selectedCategory
                ? 'bg-[var(--accent-primary)]/15 border-[var(--accent-primary)]/30 text-[var(--accent-primary)]'
                : 'bg-[var(--bg-tertiary)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
              }
            `}
          >
            <SlidersHorizontal className="w-5 h-5" />
            {selectedCategory && (
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
            )}
          </button>

          {/* Desktop View Toggle - hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-subtle)]">
            <button
              onClick={() => setViewMode('grid')}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200
                ${viewMode === 'grid'
                  ? 'bg-[var(--accent-primary)] text-black shadow-lg'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              <Grid className="w-4 h-4" />
              <span className="text-sm font-medium">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200
                ${viewMode === 'list'
                  ? 'bg-[var(--accent-primary)] text-black shadow-lg'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium">List</span>
            </button>
          </div>
        </div>

        {/* Mobile Filters - Collapsible */}
        {showMobileFilters && (
          <div className="lg:hidden glass-card p-4 space-y-4 animate-fade-in-up">
            {/* Stats Row */}
            <div className="flex items-center justify-around pb-4 border-b border-[var(--border-subtle)]">
              <div className="text-center">
                <span className="text-2xl font-bold text-[var(--text-primary)] block" style={{ fontFamily: 'var(--font-display)' }}>
                  {allPlaces.length}
                </span>
                <span className="text-xs text-[var(--text-muted)]">Total</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-[var(--accent-secondary)] block" style={{ fontFamily: 'var(--font-display)' }}>
                  {categories.length}
                </span>
                <span className="text-xs text-[var(--text-muted)]">Categories</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-[var(--accent-primary)] block" style={{ fontFamily: 'var(--font-display)' }}>
                  {filteredPlaces.length}
                </span>
                <span className="text-xs text-[var(--text-muted)]">Showing</span>
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Categories</h3>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs font-medium text-[var(--accent-primary)]"
                  >
                    Clear filter
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(categoryStats.entries())
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, count]) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(selectedCategory === category ? null : category);
                        setShowMobileFilters(false);
                      }}
                      className={`
                        inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                        ${selectedCategory === category
                          ? 'bg-[var(--accent-primary)] text-black'
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                        }
                      `}
                    >
                      <span className="capitalize">{category}</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${selectedCategory === category ? 'bg-black/20 text-black' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'}`}>
                        {count}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filter Tag */}
      {selectedCategory && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--text-muted)]">Filtered by:</span>
          <button
            onClick={() => setSelectedCategory(null)}
            className="
              inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]
              border border-[var(--accent-primary)]/30
              text-sm font-medium capitalize hover:bg-[var(--accent-primary)]/25
              transition-colors
            "
          >
            {selectedCategory}
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Mobile List View - visible only on small screens */}
          <div className="sm:hidden space-y-3">
            {filteredPlaces.map((place, index) => (
              <div
                key={`mobile-${index}`}
                className="glass-card p-4 cursor-pointer group"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                  animationDelay: `${Math.min(index * 20, 200)}ms`
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text-primary)] capitalize truncate" style={{ fontFamily: 'var(--font-display)' }}>
                      {place.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="category-pill text-xs py-0.5 px-2">
                        {place.category}
                      </span>
                      {place.notes && (
                        <span className="text-xs text-[var(--text-muted)] truncate">
                          {place.notes}
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href={place.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="
                      p-2.5 rounded-xl ml-3 flex-shrink-0
                      bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]
                      active:bg-[var(--accent-primary)] active:text-black
                      transition-all duration-200
                    "
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Grid/List View - hidden on mobile */}
          <div className={`hidden sm:grid ${viewMode === 'grid' ? 'grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-4`}>
            {filteredPlaces.map((place, index) => (
              <div
                key={`desktop-${index}`}
                onClick={() => setSelectedPlace(place)}
                className={`
                  glass-card p-5 cursor-pointer group
                  ${selectedPlace === place ? 'border-[var(--accent-primary)]/50 shadow-[0_0_30px_rgba(200,255,0,0.1)]' : ''}
                `}
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                  animationDelay: `${Math.min(index * 30, 300)}ms`
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="font-semibold text-[var(--text-primary)] text-lg capitalize group-hover:text-[var(--accent-primary)] transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {place.name}
                  </h3>
                  <a
                    href={place.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="
                      p-2 rounded-lg text-[var(--text-muted)]
                      hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10
                      transition-all duration-200 opacity-0 group-hover:opacity-100
                    "
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span className="category-pill">
                      {place.category}
                    </span>
                  </div>

                  {place.notes && (
                    <p className="text-sm text-[var(--text-muted)] italic line-clamp-2">
                      {place.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredPlaces.length === 0 && (
            <div className="glass-card p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[var(--text-muted)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                No places found
              </h3>
              <p className="text-[var(--text-muted)]">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden lg:block space-y-6">
          {/* Statistics */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[var(--accent-primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                Statistics
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)] text-sm">Total Places</span>
                <span className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  {allPlaces.length}
                </span>
              </div>
              <div className="h-px bg-[var(--border-subtle)]" />
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)] text-sm">Categories</span>
                <span className="text-2xl font-bold text-[var(--accent-secondary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  {categories.length}
                </span>
              </div>
              <div className="h-px bg-[var(--border-subtle)]" />
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)] text-sm">Showing</span>
                <span className="text-2xl font-bold text-[var(--accent-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  {filteredPlaces.length}
                </span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-secondary)]/10 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-[var(--accent-secondary)]" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Categories
                </h3>
              </div>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-2">
              {Array.from(categoryStats.entries())
                .sort(([,a], [,b]) => b - a)
                .map(([category, count]) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={`
                      w-full flex justify-between items-center px-3.5 py-2.5 rounded-xl
                      transition-all duration-200 group
                      ${selectedCategory === category
                        ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]'
                        : 'hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }
                    `}
                  >
                    <span className="text-sm font-medium capitalize truncate pr-2">{category}</span>
                    <span className={`
                      px-2.5 py-0.5 rounded-full text-xs font-bold flex-shrink-0
                      ${selectedCategory === category
                        ? 'bg-[var(--accent-primary)] text-black'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] group-hover:bg-[var(--accent-primary)] group-hover:text-black'
                      }
                      transition-all duration-200
                    `}>
                      {count}
                    </span>
                  </button>
                ))}
            </div>
          </div>

          {/* Selected Place Preview */}
          {selectedPlace && (
            <div className="glass-card p-5 border-[var(--accent-primary)]/30">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Selected
              </h3>
              <div className="space-y-4">
                <div>
                  <h4
                    className="font-semibold text-[var(--accent-primary)] text-lg mb-2 capitalize"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {selectedPlace.name}
                  </h4>
                  <span className="category-pill">
                    {selectedPlace.category}
                  </span>
                </div>

                {selectedPlace.notes && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Notes</p>
                    <p className="text-sm text-[var(--text-secondary)]">{selectedPlace.notes}</p>
                  </div>
                )}

                <a
                  href={selectedPlace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-sm py-3"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Calories</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
