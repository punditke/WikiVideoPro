export async function fetchVideoByPageId(pageId) {
  try {
    const data = await fetchFromWikimedia('', {
      action: 'query',
      pageids: pageId,           // Fetch exactly this page
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
