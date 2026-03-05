// API route to handle Wikimedia Commons requests (avoids CORS issues)
export default async function handler(req, res) {
  const { query } = req.query;
  
  try {
    const response = await fetch(
      `https://commons.wikimedia.org/w/api.php?` +
      `action=query&` +
      `list=search&` +
      `srsearch=${query} filetype:video&` +
      `srnamespace=6&` +
      `format=json&` +
      `origin=*`
    );
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
      }
