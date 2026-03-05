export const fetchFromWikimedia = async (endpoint, params) => {
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
};

export const extractDuration = (title) => {
  const durationMatch = title.match(/(\d+)[:_-]?(\d+)/);
  if (durationMatch) {
    const mins = durationMatch[1].padStart(2, '0');
    const secs = durationMatch[2].padStart(2, '0');
    return `${mins}:${secs}`;
  }
  return '00:30';
};
