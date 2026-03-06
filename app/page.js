'use client';

import { useState } from 'react';
import { useVideos } from '@/hooks/useVideos';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
import ToggleView from '@/components/ToggleView';

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('grid');
  const { videos, loading, hasMore, category, setCategory, fetchVideos, setSearchQuery } = useVideos('trending');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // The useVideos hook automatically resets and fetches when searchQuery changes
  };

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(true)} onSearch={handleSearch} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
      </main>
    </>
  );
    }
