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
    <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column: player + metadata */}
        <div className="lg:w-2/3 space-y-6">
          <VideoPlayer video={video} />
        </div>

        {/* Right column: recommendations (scrollable on desktop) */}
        <div className="hidden lg:block lg:w-1/3">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h2 className="font-playfair text-2xl font-bold text-white mb-6">Recommended Videos</h2>
            <RecommendationRail currentVideoId={video.id} category={video.category} />
          </div>
        </div>

        {/* Mobile: recommendations below player */}
        <div className="lg:hidden mt-8">
          <h2 className="font-playfair text-2xl font-bold text-white mb-6">Recommended Videos</h2>
          <RecommendationRail currentVideoId={video.id} category={video.category} />
        </div>
      </div>
    </main>
  );
    }
