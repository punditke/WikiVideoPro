import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const mockSuggestions = [
    'nature documentary', 'space exploration', 'historical footage',
    'scientific experiments', 'wildlife animals', 'time-lapse',
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      setSuggestions(mockSuggestions.filter(s => 
        s.toLowerCase().includes(value.toLowerCase())
      ));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for videos..."
            className="w-full h-14 pl-14 pr-12 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 font-inter"
          />
          <HiOutlineSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        </div>
      </form>
    </div>
  );
              }
