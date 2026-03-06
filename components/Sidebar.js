'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiTrendingUp, 
  HiOutlinePhotograph, 
  HiOutlineGlobe, 
  HiOutlineClock, 
  HiOutlineBeaker 
} from 'react-icons/hi';

const categories = [
  { id: 'trending', name: 'Trending', icon: HiTrendingUp },
  { id: 'nature', name: 'Nature', icon: HiOutlinePhotograph },
  { id: 'space', name: 'Space', icon: HiOutlineGlobe },
  { id: 'history', name: 'History', icon: HiOutlineClock },
  { id: 'science', name: 'Science', icon: HiOutlineBeaker },
];

export default function Sidebar({ isOpen, onClose, activeCategory, onCategoryChange }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Sidebar panel */}
          <motion.aside
            className="fixed top-0 left-0 h-full w-64 bg-zinc-900/80 backdrop-blur-xl border-r border-white/5 z-50 overflow-y-auto"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="p-6">
              {/* Logo / header */}
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">W</span>
                </div>
                <span className="font-playfair text-xl font-bold text-white">WikiVideo</span>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onCategoryChange(cat.id);
                        onClose(); // auto‑close on mobile
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeCategory === cat.id
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-inter text-sm">{cat.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
              }
