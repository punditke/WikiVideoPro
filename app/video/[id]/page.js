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
    <>
      {/* Sticky header is already in layout, so main content starts below it */}
      <main className="pt-20 h-[calc(100vh-5rem)] flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Left column: player + metadata (takes full width on mobile, 2/3 on desktop) */}
        <div className="lg:w-2/3 space-y-6 overflow-y-auto pb-8" style={{ maxHeight: 'calc(100vh - 5rem)' }}>
          <VideoPlayer video={video} />
        </div>

        {/* Right column: recommendations (hidden on mobile, visible on desktop) */}
        <div className="hidden lg:block lg:w-1/3 overflow-y-auto pb-8" style={{ maxHeight: 'calc(100vh - 5rem)' }}>
          <h2 className="font-playfair text-2xl font-bold text-white mb-6">Recommended Videos</h2>
          <RecommendationRail currentVideoId={video.id} category={video.category} />
        </div>

        {/* On mobile, recommendations appear below the player (full width) */}
        <div className="lg:hidden mt-8">
          <h2 className="font-playfair text-2xl font-bold text-white mb-6">Recommended Videos</h2>
          <RecommendationRail currentVideoId={video.id} category={video.category} />
        </div>
      </main>
    </>
  );
    }
