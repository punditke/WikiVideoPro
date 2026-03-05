import { useEffect, useRef } from 'react';
import VideoCard from './VideoCard';

export default function VideoGrid({ videos, isLoading, hasMore, onLoadMore, view }) {
  const observerRef = useRef();

  useEffect(() => {
    if (!hasMore || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { threshold: 0.5 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  const gridClass = view === 'grid'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    : 'flex flex-col space-y-4';

  return (
    <>
      <div className={gridClass}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} view={view} />
        ))}
      </div>

      {/* Loading trigger */}
      <div ref={observerRef} className="w-full py-8 flex justify-center">
        {isLoading && (
          <div className="flex space-x-2 text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-150" />
            <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-300" />
          </div>
        )}
        {!hasMore && videos.length > 0 && (
          <p className="text-zinc-500 text-sm">No more videos</p>
        )}
      </div>
    </>
  );
    }
