import { useState, useEffect } from 'react';
import { fetchFromWikimedia, extractDuration } from '@/utils/api';

export const useVideos = (initialCategory = 'trending') => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(initialCategory);

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

  const fetchVideos = async (searchQuery = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const searchTerm = searchQuery || getCategorySearchTerm(category);
      const data = await fetchFromWikimedia('', {
        action: 'query',
        list: 'search',
        srsearch: `${searchTerm} filetype:video`,
        srnamespace: 6,
        srlimit: 20,
      });

      const searchResults = data.query?.search || [];
      
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
      
      setVideos(videoDetails.filter(v => v.thumbnail));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [category]);

  return {
    videos,
    loading,
    error,
    category,
    setCategory,
    fetchVideos,
  };
};
