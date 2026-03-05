import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchFromWikimedia, extractDuration } from '@/utils/api';

export const useVideos = (initialCategory = 'trending') => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const loadingRef = useRef(false);

  const getCategorySearchTerm = (cat) => {
    const terms = {
      trending: 'popular',
      nature: 'nature wildlife',
      space: 'space astronomy',
      history: 'history archive',
      science: 'science experiment'
    };
    return terms[cat] || 'video';
  };

  const fetchVideoDetails = async (title) => {
    try {
      const data = await fetchFromWikimedia('', {
        action: 'query',
        titles: title,
        prop: 'imageinfo',
        iiprop: 'url|thumbnail|size|mime|extmetadata',
        iiurlwidth: 600,
      });

      const pages = data.query?.pages || {};
      const page = Object.values(pages)[0];
      const imageInfo = page.imageinfo?.[0];
      
      if (!imageInfo) return null;

      const metadata = imageInfo.extmetadata || {};
      
      return {
        thumbnail: imageInfo.thumburl,
        url: imageInfo.descriptionurl,
        fileUrl: imageInfo.url,
        mime: imageInfo.mime,
        size: imageInfo.size,
        duration: extractDuration(title),
        license: metadata.LicenseShortName?.value || 'Unknown',
        artist: metadata.Artist?.value || 'Unknown',
        description: metadata.ImageDescription?.value || ''
      };
    } catch (error) {
      console.error('Error fetching video details:', error);
      return null;
    }
  };

  const fetchVideos = useCallback(async (reset = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const searchTerm = searchQuery || getCategorySearchTerm(category);
      const newOffset = reset ? 0 : offset;
      
      const data = await fetchFromWikimedia('', {
        action: 'query',
        list: 'search',
        srsearch: `${searchTerm} filetype:video`,
        srnamespace: 6,
        srlimit: 20,
        sroffset: newOffset,
      });

      const searchResults = data.query?.search || [];
      const continueOffset = data.continue?.sroffset;

      const videoDetails = await Promise.all(
        searchResults.map(async (item) => {
          const details = await fetchVideoDetails(item.title);
          return {
            id: item.pageid,
            title: item.title,
            ...details
          };
        })
      );

      const newVideos = videoDetails.filter(v => v.thumbnail);
      
      setVideos(prev => reset ? newVideos : [...prev, ...newVideos]);
      setOffset(continueOffset || 0);
      setHasMore(!!continueOffset);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [category, searchQuery, offset]);

  // Reset when category or search changes
  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    fetchVideos(true);
  }, [category, searchQuery]);

  return {
    videos,
    loading,
    hasMore,
    category,
    setCategory,
    fetchVideos: () => fetchVideos(false),
    setSearchQuery,
  };
};
