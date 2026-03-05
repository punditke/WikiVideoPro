// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';
import SearchBar from '../components/SearchBar';
import CinematicTheater from '../components/CinematicTheater';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [activeCategory, setActiveCategory] = useState('trending');

  useEffect(() => {
    fetchVideos();
  }, [activeCategory]);

  const fetchVideos = async (query = '') => {
    setIsLoading(true);
    try {
      const searchTerm = query || getCategorySearchTerm(activeCategory);
      const response = await fetch(
        `https://commons.wikimedia.org/w/api.php?` +
        `action=query&` +
        `list=search&` +
        `srsearch=${searchTerm} filetype:video&` +
        `srnamespace=6&` +
        `format=json&` +
        `origin=*`
      );
      
      const data = await response.json();
      const searchResults = data.query?.search || [];
      
      // Fetch thumbnails and metadata for each video
      const videoDetails = await Promise.all(
        searchResults.slice(0, 20).map(async (item) => {
          const details = await fetchVideoDetails(item.title);
          return {
            id: item.pageid,
            title: item.title,
            ...details
          };
        })
      );
      
      setVideos(videoDetails.filter(v => v.thumbnail));
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVideoDetails = async (title) => {
    try {
      const response = await fetch(
        `https://commons.wikimedia.org/w/api.php?` +
        `action=query&` +
        `titles=${encodeURIComponent(title)}&` +
        `prop=imageinfo&` +
        `iiprop=url|thumbnail|size|mime|extmetadata&` +
        `iiurlwidth=600&` +
        `format=json&` +
        `origin=*`
      );
      
      const data = await response.json();
      const pages = data.query?.pages || {};
      const page = Object.values(pages)[0];
      const imageInfo = page.imageinfo?.[0];
      
      if (!imageInfo) return null;

      // Extract duration from metadata if available
      const metadata = imageInfo.extmetadata || {};
      const duration = metadata.ObjectName?.value || extractDurationFromTitle(title);
      
      return {
        thumbnail: imageInfo.thumburl,
        url: imageInfo.descriptionurl,
        fileUrl: imageInfo.url,
        mime: imageInfo.mime,
        size: imageInfo.size,
        duration,
        license: metadata.LicenseShortName?.value || 'Unknown',
        artist: metadata.Artist?.value || 'Unknown',
        description: metadata.ImageDescription?.value || ''
      };
    } catch (error) {
      console.error('Error fetching video details:', error);
      return null;
    }
  };

  const extractDurationFromTitle = (title) => {
    // Simple duration extraction from title (you might want to improve this)
    const durationMatch = title.match(/(\d+)[:_-]?(\d+)/);
    if (durationMatch) {
      const mins = durationMatch[1].padStart(2, '0');
      const secs = durationMatch[2].padStart(2, '0');
      return `${mins}:${secs}`;
    }
    return '00:30';
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      fetchVideos(query);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedVideo(null);
  };

  return (
    <>
      <Head>
        <title>WikiVideo Pro - Premium Video Discovery</title>
        <meta name="description" content="Discover high-quality videos from Wikimedia Commons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
        <Sidebar 
          recentSearches={recentSearches}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <main className="flex-1 overflow-y-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="container mx-auto px-6 py-8 relative z-10">
            <div className="mb-8">
              <h1 className="font-playfair text-4xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                WikiVideo Pro
              </h1>
              <p className="text-zinc-400">Discover premium video content from Wikimedia Commons</p>
            </div>

            <SearchBar onSearch={handleSearch} />

            <AnimatePresence mode="wait">
              {selectedVideo ? (
                <motion.div
                  key="theater"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8"
                >
                  <CinematicTheater 
                    video={selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <VideoGrid 
                    videos={videos}
                    isLoading={isLoading}
                    onVideoSelect={setSelectedVideo}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
}

const getCategorySearchTerm = (category) => {
  const terms = {
    trending: 'popular',
    nature: 'nature wildlife',
    space: 'space astronomy',
    history: 'history archive',
    science: 'science experiment'
  };
  return terms[category] || 'video';
};
