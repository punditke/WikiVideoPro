'use client';

import { useParams } from 'next/navigation';
import { useVideos } from '@/hooks/useVideos';
import VideoPlayer from '@/components/VideoPlayer';
import RecommendationRail from '@/components/RecommendationRail';

export default function VideoPage() {
  const { id } = useParams();
  // Fetch single video by id (you may need a new hook or fetch directly)
  // For now, assume we have a video object from context or API
  const { videos } = useVideos(); // get all videos; find current
  const video = videos.find(v => v.id === Number(id));

  if (!video) return <div>Loading...</div>;

  return (
    <main className="pt-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Player + metadata */}
        <VideoPlayer video={video} />

        {/* Recommendations – reuse same grid component */}
        <div className="mt-12">
          <h2 className="font-playfair text-2xl font-bold text-white mb-6">Recommended Videos</h2>
          <RecommendationRail currentVideoId={video.id} category={video.category} />
        </div>
      </div>
    </main>
  );
}
