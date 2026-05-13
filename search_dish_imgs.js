// Search Wikipedia API for dish images using different methods
const dishes = [
  { name: "Mutton Chukka", queries: ["Mutton pepper fry", "Chettinad pepper mutton", "dry mutton curry"] },
  { name: "Nethili Fish Fry", queries: ["Anchovy fry", "Fried anchovy", "Nethili karuvaadu"] },
  { name: "Chicken 65", queries: ["Chicken 65 dish"] },
  { name: "Bun Parotta", queries: ["Parotta Indian bread", "Malabar parotta", "Kerala parotta"] },
  { name: "Madurai Kalakki", queries: ["Madurai egg dish", "Kalakki egg"] },
  { name: "Egg Kothu Parotta", queries: ["Kottu roti egg", "Kothu parotta"] },
  { name: "Veg Kothu Parotta", queries: ["Vegetable kottu", "Veg kothu parotta"] },
  { name: "Madurai Jigarthanda", queries: ["Jigarthanda drink", "Jigarthanda Madurai"] },
];

async function searchWikipedia(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&utf8=1&srlimit=3`;
  const res = await fetch(url, { headers: {'User-Agent': 'Mozilla/5.0'} });
  const data = await res.json();
  if (!data.query?.search?.length) return [];
  return data.query.search.map(r => r.title);
}

async function getPageImage(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=800&format=json&titles=${encodeURIComponent(title)}&redirects=1`;
  const res = await fetch(url, { headers: {'User-Agent': 'Mozilla/5.0'} });
  const data = await res.json();
  const pages = data.query.pages;
  const p = Object.values(pages)[0];
  if (p?.thumbnail?.source) {
    // Convert thumb URL to full URL
    return p.thumbnail.source.replace(/\/\d+px-[^\/]+$/, `/${p.thumbnail.width}px-` + p.thumbnail.source.split('/').pop());
  }
  return null;
}

async function searchCommonsAPI(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=5&utf8=1`;
  const res = await fetch(url, { headers: {'User-Agent': 'Mozilla/5.0'} });
  const data = await res.json();
  if (!data.query?.search?.length) return null;
  
  for (const r of data.query.search) {
    const title = r.title;
    const imgUrl = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(title)}&format=json`;
    const imgRes = await fetch(imgUrl, { headers: {'User-Agent': 'Mozilla/5.0'} });
    const imgData = await imgRes.json();
    const p = Object.values(imgData.query.pages)[0];
    if (p?.imageinfo?.[0]?.url) {
      const src = p.imageinfo[0].url;
      if (/\.(jpg|jpeg|png|JPG|JPEG)$/.test(src)) return src;
    }
  }
  return null;
}

async function run() {
  for (const dish of dishes) {
    let found = null;
    
    // Try Wikipedia page image first
    for (const q of dish.queries) {
      const titles = await searchWikipedia(q);
      for (const t of titles) {
        const img = await getPageImage(t);
        if (img) { found = img; break; }
      }
      if (found) break;
    }
    
    // Try Commons search as fallback
    if (!found) {
      for (const q of dish.queries) {
        found = await searchCommonsAPI(q + " food india");
        if (found) break;
      }
    }
    
    console.log(`${dish.name} => ${found || "NOT_FOUND"}`);
  }
}
run();
