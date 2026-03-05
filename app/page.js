'use client';

import { useState } from 'react';
import { useVideos } from '@/hooks/useVideos';
import VideoGrid from '@/components/VideoGrid';
import ToggleView from '@/components/ToggleView';

export default function HomePage() {
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const { videos, loading, hasMore, fetchVideos } = useVideos('trending');

  return (
    <main className="pt-20"> {/* offset for sticky header */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-end mb-6">
          <ToggleView view={view} onChange={setView} />
        </div>

        <VideoGrid
          videos={videos}
          isLoading={loading}
          hasMore={hasMore}
          onLoadMore={fetchVideos}
          view={view}
        />
      </div>
    </main>
  );
}
