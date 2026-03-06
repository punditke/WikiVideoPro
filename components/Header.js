'use client';

import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';

export default function Header({ onMenuClick, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-zinc-400"
            aria-label="Toggle menu"
          >
            <HiMenu className="w-6 h-6" />
          </button>

          {/* Site title */}
          <h1 className="font-playfair text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            WikiVideo Pro
          </h1>

          {/* Search bar - hidden on mobile, visible on larger screens */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 px-4 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
              />
            </form>
          </div>

          {/* Spacer for symmetry */}
          <div className="w-10 lg:w-0" />
        </div>

        {/* Mobile search bar - below title on small screens */}
        <div className="lg:hidden mt-2">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 px-4 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
            />
          </form>
        </div>
      </div>
    </header>
  );
    }
