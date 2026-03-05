import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineFilm, HiOutlineClock } from 'react-icons/hi';

export default function VideoGrid({ videos, isLoading, hasMore, onLoadMore, onVideoSelect }) {
  const observerRef = useRef();

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  // Loading skeleton for initial load
  if (isLoading && videos.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-zinc-800/50 rounded-xl aspect-video" />
            <div className="mt-3 space-y-2">
              <div className="h-4 bg-zinc-800/50 rounded w-3/4" />
              <div className="h-3 bg-zinc-800/50 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {videos.map((video) => (
          <motion.div
            key={video.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onVideoSelect(video)}
            className="group cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden bg-zinc-900/50 border border-white/5">
              <div className="aspect-video">
                {video.thumbnail ? (
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                    <HiOutlineFilm className="w-8 h-8 text-zinc-600" />
                  </div>
                )}
              </div>
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex space-x-2">
                {video.mime?.includes('video') && (
                  <span className="px-2 py-1 text-xs font-inter bg-black/60 backdrop-blur-sm rounded-md border border-white/10 text-white">
                    MP4
                  </span>
                )}
              </div>
              
              <div className="absolute bottom-3 right-3">
                <span className="px-2 py-1 text-xs font-inter bg-black/60 backdrop-blur-sm rounded-md border border-white/10 text-white flex items-center">
                  <HiOutlineClock className="w-3 h-3 mr-1" />
                  {video.duration}
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <h3 className="font-inter text-sm font-medium text-white line-clamp-1">
                {video.title?.replace(/_/g, ' ') || 'Untitled'}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Loading indicator and intersection trigger */}
      <div ref={observerRef} className="w-full py-8 flex justify-center">
        {isLoading && videos.length > 0 && (
          <div className="flex items-center space-x-2 text-zinc-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-150" />
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-300" />
          </div>
        )}
        {!hasMore && videos.length > 0 && (
          <p className="text-zinc-500 text-sm">No more videos</p>
        )}
      </div>
    </>
  );
                   }
