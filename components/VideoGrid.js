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

  if (isLoading && videos.length === 0) {
    return ( /* loading skeleton - unchanged */ );
  }

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
            {/* video card content - unchanged */}
          </motion.div>
        ))}
      </motion.div>

      {/* Loading indicator and intersection trigger */}
      <div ref={observerRef} className="w-full py-8 flex justify-center">
        {isLoading && (
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
