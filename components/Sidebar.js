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
      </div>
    </motion.aside>
  );
        }
