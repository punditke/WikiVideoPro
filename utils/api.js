// utils/api.js

// Base fetch function
export async function fetchFromWikimedia(endpoint, params) {
  const baseUrl = 'https://commons.wikimedia.org/w/api.php';
  const defaultParams = {
    format: 'json',
    origin: '*',
  };

  const searchParams = new URLSearchParams({
    ...defaultParams,
    ...params,
  });

  try {
    const response = await fetch(`${baseUrl}?${searchParams}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Helper to extract duration from title (your existing function)
export function extractDuration(title) {
  const durationMatch = title.match(/(\d+)[:_-]?(\d+)/);
  if (durationMatch) {
    const mins = durationMatch[1].padStart(2, '0');
    const secs = durationMatch[2].padStart(2, '0');
    return `${mins}:${secs}`;
  }
  return '00:30';
}

// New function to fetch video by page ID (for the video page)
export async function fetchVideoByPageId(pageId) {
  try {
    const data = await fetchFromWikimedia('', {
      action: 'query',
      pageids: pageId,
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
      id: page.pageid,
      title: page.title,
      thumbnail: imageInfo.thumburl,
      url: imageInfo.descriptionurl,
      fileUrl: imageInfo.url,
      mime: imageInfo.mime,
      size: imageInfo.size,
      duration: extractDuration(page.title),
      license: metadata.LicenseShortName?.value || 'Unknown',
      artist: metadata.Artist?.value || 'Unknown',
      description: metadata.ImageDescription?.value || ''
    };
  } catch (error) {
    console.error('Error fetching video by page ID:', error);
    return null;
  }
      }
