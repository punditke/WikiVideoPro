'use client';

import { useParams } from 'next/navigation';
import { useVideos } from '@/hooks/useVideos';
import VideoPlayer from '@/components/VideoPlayer';
import RecommendationRail from '@/components/RecommendationRail';

export default function VideoPage() {
  const { id } = useParams();
  const { videos } = useVideos();
  const video = videos.find(v => v.id === Number(id));

  if (!video) return <div>Loading...</div>;

  return (
    <main className="pt-20 h-screen flex flex-col">
      {/* Content container with flex-1 to take remaining space */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-0">
        {/* Left column: player + metadata (no scroll) */}
        <div className="lg:w-2/3 space-y-6">
          <VideoPlayer video={video} />
        </div>

        {/* Right column: recommendations (scrollable) */}
        <div className="hidden lg:flex lg:w-1/3 flex-col min-h-0">
          <h2 className="font-playfair text-2xl font-bold text-white mb-6 flex-shrink-0">Recommended Videos</h2>
          <div className="overflow-y-auto flex-1 min-h-0">
            <RecommendationRail currentVideoId={video.id} category={video.category} />
          </div>
        </div>

        {/* Mobile: recommendations below player (scrolls naturally) */}
        <div className="lg:hidden mt-8">
          <h2 className="font-playfair text-2xl font-bold text-white mb-6">Recommended Videos</h2>
          <RecommendationRail currentVideoId={video.id} category={video.category} />
        </div>
      </div>
    </main>
  );
    }
