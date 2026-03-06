'use client';

import { useVideos } from '@/hooks/useVideos';
import VideoGrid from './VideoGrid';

// Simple shuffle function (can be reused)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function RecommendationRail({ currentVideoId, category }) {
  const { videos, loading } = useVideos(category);
  
  // Filter out current video and shuffle
  const recommendations = videos.filter(v => v.id !== currentVideoId);
  const shuffledRecs = shuffleArray(recommendations).slice(0, 8); // take first 8 after shuffle

  return (
    <VideoGrid
      videos={shuffledRecs}
      isLoading={loading}
      hasMore={false}
      onLoadMore={() => {}}
      view="grid"
    />
  );
  }
