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

  // Header height is 5rem (pt-20). Viewport height minus header.
  const mainHeight = 'h-[calc(100vh-5rem)]';

  return (
    <main className={`pt-20 ${mainHeight} flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`}>
      {/* Left column: player + metadata (fixed, no scroll) */}
      <div className="lg:w-2/3 space-y-6">
        <VideoPlayer video={video} />
      </div>

      {/* Right column: recommendations (scrollable) */}
      <div className="hidden lg:block lg:w-1/3 overflow-y-auto" style={{ maxHeight: '100%' }}>
        <h2 className="font-playfair text-2xl font-bold text-white mb-6">Recommended Videos</h2>
        <RecommendationRail currentVideoId={video.id} category={video.category} />
      </div>

      {/* Mobile: recommendations below player (full width) */}
      <div className="lg:hidden mt-8">
        <h2 className="font-playfair text-2xl font-bold text-white mb-6">Recommended Videos</h2>
        <RecommendationRail currentVideoId={video.id} category={video.category} />
      </div>
    </main>
  );
    }
