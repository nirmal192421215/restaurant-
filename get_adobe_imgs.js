const searches = {
  "Chicken 65": "chicken+65+indian+food",
  "Banana Leaf Full Meals": "banana+leaf+south+indian+meals",
  "Mini Meals": "south+indian+thali+rice+meals",
  "Veg Meals": "vegetarian+thali+south+indian",
  "Non-Veg Meals": "non+veg+thali+indian+chicken+rice",
  "Sweet Pongal": "sweet+pongal+sakkarai+pongal",
  "Filter Degree Coffee": "south+indian+filter+coffee+tumbler",
  "Rose Milk": "rose+milk+pink+indian+drink",
  "Nethili Fish Fry": "nethili+fish+fry+anchovy+indian",
  "Madurai Jigarthanda": "jigarthanda+madurai+cold+drink",
  "Bun Parotta": "parotta+layered+flatbread+indian",
  "Madurai Kalakki": "scrambled+eggs+masala+indian",
  "Veg Kothu Parotta": "kothu+parotta+vegetable",
  "Egg Kothu Parotta": "kothu+parotta+egg",
};

async function fetchAdobePreview(query) {
  const url = `https://stock.adobe.com/in/search?k=${query}&limit=10`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const html = await res.text();
    // Look for thumbnail image URLs in the HTML - Adobe uses t3.ftcdn.net or similar
    const patterns = [
      /https:\/\/t[0-9]+\.ftcdn\.net\/jpg\/[^\s"']+\.jpg/g,
      /https:\/\/as[0-9]+\.ftcdn\.net\/v2\/jpg\/[^\s"']+\.jpg/g,
      /"thumbnail_url":"([^"]+)"/g,
      /content_url['":\s]+"(https:\/\/[^"]+\.jpg)"/g,
    ];
    for (const pattern of patterns) {
      const matches = html.match(pattern);
      if (matches && matches.length > 0) {
        return matches[0].replace(/"/g, '');
      }
    }
    return null;
  } catch(e) {
    return null;
  }
}

async function run() {
  for (const [dish, query] of Object.entries(searches)) {
    const url = await fetchAdobePreview(query);
    console.log(`${dish}: ${url || 'NOT_FOUND'}`);
    await new Promise(r => setTimeout(r, 500));
  }
}
run();
