import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiTrendingUp, 
  HiOutlinePhotograph, 
  HiOutlineGlobe, 
  HiOutlineClock, 
  HiOutlineBeaker,
  HiMenuAlt2,
  HiChevronLeft
} from 'react-icons/hi';

const categories = [
  { id: 'trending', name: 'Trending', icon: HiTrendingUp },
  { id: 'nature', name: 'Nature', icon: HiOutlinePhotograph },
  { id: 'space', name: 'Space', icon: HiOutlineGlobe },
  { id: 'history', name: 'History', icon: HiOutlineClock },
  { id: 'science', name: 'Science', icon: HiOutlineBeaker },
];

export default function Sidebar({ recentSearches, activeCategory, onCategoryChange }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`${collapsed ? 'w-20' : 'w-64'} bg-zinc-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col h-full transition-all duration-300 relative`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-zinc-800 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white z-10"
      >
        {collapsed ? <HiMenuAlt2 className="w-4 h-4" /> : <HiChevronLeft className="w-4 h-4" />}
      </button>

      <div className="p-6">
        {/* Logo - simplified when collapsed */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-2'} mb-8`}>
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">W</span>
          </div>
          {!collapsed && (
            <span className="font-playfair text-xl font-bold text-white">WikiVideo</span>
          )}
        </div>

        <nav className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ x: collapsed ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
                title={collapsed ? category.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-inter text-sm">{category.name}</span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Optional: recent searches - hide when collapsed */}
      {!collapsed && recentSearches.length > 0 && (
        <div className="mt-auto p-6 border-t border-white/5">
          <h3 className="font-inter text-xs uppercase tracking-wider text-zinc-500 mb-3">
            Recent Searches
          </h3>
          {/* ... recent searches list ... */}
        </div>
      )}
    </motion.aside>
  );
          }
