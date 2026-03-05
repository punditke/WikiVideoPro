import { useVideos } from '@/hooks/useVideos';
import VideoGrid from './VideoGrid';

export default function RecommendationRail({ currentVideoId, category }) {
  const { videos, loading } = useVideos(category); // fetch same category
  const recommendations = videos.filter(v => v.id !== currentVideoId).slice(0, 8);

  return (
    <VideoGrid
      videos={recommendations}
      isLoading={loading}
      hasMore={false} // no infinite scroll here
      onLoadMore={() => {}}
      view="grid"
    />
  );
}
