// components/Sidebar.js
import { motion } from 'framer-motion';
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

export default function Sidebar({ recentSearches, activeCategory, onCategoryChange }) {
  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-zinc-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col h-full"
    >
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">W</span>
          </div>
          <span className="font-playfair text-xl font-bold text-white">WikiVideo</span>
        </div>

        <nav className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-inter text-sm">{category.name}</span>
              </motion.button>
            );
          })}
        </nav>

        {recentSearches.length > 0 && (
          <div className="mt-8">
            <h3 className="font-inter text-xs uppercase tracking-wider text-zinc-500 mb-3">
              Recent Searches
            </h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                >
                  {search}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full" />
          <div>
            <p className="font-inter text-sm font-medium">API Status</p>
            <p className="font-inter text-xs text-emerald-400">● Connected</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
               }
