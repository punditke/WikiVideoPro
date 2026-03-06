'use client';

export default function ToggleView({ view, onChange }) {
  return (
    <div className="flex bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-lg p-1">
      <button
        onClick={() => onChange('grid')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition ${
          view === 'grid' ? 'bg-emerald-500 text-white' : 'text-zinc-400 hover:text-white'
        }`}
      >
        Grid
      </button>
      <button
        onClick={() => onChange('list')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition ${
          view === 'list' ? 'bg-emerald-500 text-white' : 'text-zinc-400 hover:text-white'
        }`}
      >
        List
      </button>
    </div>
  );
          }
