import { motion } from 'framer-motion';
import { HiOutlineX, HiOutlineLink, HiOutlineDownload, HiOutlineExternalLink } from 'react-icons/hi';

export default function CinematicTheater({ video, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-7xl bg-zinc-900/90 rounded-2xl border border-white/10 overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-lg">
          <HiOutlineX className="w-5 h-5 text-white" />
        </button>
        
        <div className="flex flex-col lg:flex-row h-[80vh]">
          <div className="lg:w-[70%] bg-black/50 flex items-center justify-center p-8">
            {video.thumbnail && (
              <img src={video.thumbnail} alt={video.title} className="w-full rounded-xl" />
            )}
          </div>
          
          <div className="lg:w-[30%] border-l border-white/5 p-6 overflow-y-auto">
            <h2 className="font-playfair text-2xl font-bold text-white mb-4">
              {video.title?.replace(/_/g, ' ')}
            </h2>
            
            <div className="space-y-4">
              <p className="text-zinc-400 text-sm">License: {video.license}</p>
              <p className="text-zinc-400 text-sm">Duration: {video.duration}</p>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-black/30 rounded-lg border border-white/5 hover:border-emerald-500/30">
                  <span>Copy Link</span>
                  <HiOutlineLink className="w-5 h-5" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <span className="text-emerald-400">View on Commons</span>
                  <HiOutlineExternalLink className="w-5 h-5 text-emerald-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
