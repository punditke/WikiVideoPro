import { useState } from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';
import SearchBar from '../components/SearchBar';
import CinematicTheater from '../components/CinematicTheater';
import { useVideos } from '../hooks/useVideos';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { videos, loading, category, setCategory, fetchVideos } = useVideos('trending');

  return (
    <>
      <Head>
        <title>WikiVideo Pro - Video Discovery</title>
        <meta name="description" content="Discover videos from Wikimedia Commons" />
      </Head>

      <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
        <Sidebar 
          activeCategory={category}
          onCategoryChange={setCategory}
          recentSearches={[]}
        />
        
        <main className="flex-1 overflow-y-auto relative">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="font-playfair text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                WikiVideo Pro
              </h1>
              <p className="text-zinc-400 mt-2">Discover premium video content from Wikimedia Commons</p>
            </div>

            <SearchBar onSearch={fetchVideos} />

            <AnimatePresence mode="wait">
              {selectedVideo ? (
                <CinematicTheater 
                  video={selectedVideo}
                  onClose={() => setSelectedVideo(null)}
                />
              ) : (
                <VideoGrid 
                  videos={videos}
                  isLoading={loading}
                  onVideoSelect={setSelectedVideo}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
    }
