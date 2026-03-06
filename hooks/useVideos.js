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

    if (reset) {
      // Shuffle the first page
      const shuffled = shuffleArray(newVideos);
      setVideos(shuffled);
    } else {
      setVideos(prev => [...prev, ...newVideos]);
    }
    setOffset(continueOffset || 0);
    setHasMore(!!continueOffset);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
    loadingRef.current = false;
  }
}, [category, searchQuery, offset]);
