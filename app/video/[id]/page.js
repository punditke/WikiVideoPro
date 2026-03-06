'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchVideoByPageId } from '@/utils/api';
import VideoPlayer from '@/components/VideoPlayer';
import RecommendationRail from '@/components/RecommendationRail';

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideo() {
      setLoading(true);
      const videoData = await fetchVideoByPageId(id); // Use the page ID directly
      setVideo(videoData);
      setLoading(false);
    }
    loadVideo();
  }, [id]);

  if (loading) {
    return (
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </main>
    );
  }

  if (!video) {
    return (
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center text-zinc-400">Video not found</div>
      </main>
    );
  }

  return (
    <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column: player + metadata */}
        <div className="lg:w-2/3 space-y-6">
          <VideoPlayer video={video} />
        </div>

        {/* Right column: recommendations */}
        <div className="hidden lg:block lg:w-1/3">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h2 className="font-playfair text-2xl font-bold text-white mb-6">Recommended Videos</h2>
            <RecommendationRail currentVideoId={video.id} category={video.category} />
          </div>
        </div>

        {/* Mobile recommendations */}
        <div className="lg:hidden mt-8">
          <h2 className="font-playfair text-2xl font-bold text-white mb-6">Recommended Videos</h2>
          <RecommendationRail currentVideoId={video.id} category={video.category} />
        </div>
      </div>
    </main>
  );
}
