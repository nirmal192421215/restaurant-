const searches = [
  { name: "Nethili Fish Fry", titles: ["Nethili", "Anchovy fry", "Fried anchovies"] },
  { name: "Chicken 65", titles: ["Chicken 65"] },
  { name: "Madurai Kari Dosa", titles: ["Kari Dosa", "Dosa"] },
  { name: "Kothu Parotta", titles: ["Kothu parotta", "Kottu roti"] },
  { name: "Bun Parotta", titles: ["Parotta", "Kerala parotta"] },
  { name: "Veg Kothu Parotta", titles: ["Kottu roti with vegetables", "Vegetable kothu"] },
  { name: "Jigarthanda", titles: ["Jigarthanda"] },
  { name: "Semiya Payasam", titles: ["Semiya payasam", "Vermicelli payasam", "Kheer"] },
  { name: "Sweet Pongal", titles: ["Sakkarai pongal", "Sweet pongal"] },
  { name: "Filter Coffee", titles: ["Filter coffee", "South Indian coffee"] },
  { name: "Sukku Coffee", titles: ["Sukku coffee", "Dry ginger tea"] },
  { name: "Rose Milk", titles: ["Rose milk", "Rose sherbet"] }
];

async function getWikiImageByTitle(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}&redirects=1`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== "-1" && pages[pageId].original) {
      return pages[pageId].original.source;
    }
  } catch(e) {}
  return null;
}

async function getCommonsImage(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=5`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    if (data.query && data.query.search && data.query.search.length > 0) {
      for (const result of data.query.search) {
        const title = result.title;
        const imgUrl = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(title)}&format=json`;
        const imgRes = await fetch(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const imgData = await imgRes.json();
        const p = imgData.query.pages;
        const pId = Object.keys(p)[0];
        if (pId !== "-1" && p[pId].imageinfo && p[pId].imageinfo[0]) {
          const src = p[pId].imageinfo[0].url;
          if (src && (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png') || src.endsWith('.JPG'))) {
            return src;
          }
        }
      }
    }
  } catch(e) {}
  return null;
}

async function run() {
  for (const dish of searches) {
    let found = null;
    // Try Wikipedia first
    for (const t of dish.titles) {
      found = await getWikiImageByTitle(t);
      if (found) break;
    }
    // If not found, try Commons search
    if (!found) {
      for (const t of dish.titles) {
        found = await getCommonsImage(t + " food india");
        if (found) break;
      }
    }
    console.log(`${dish.name} => ${found || "NOT_FOUND"}`);
  }
}
run();
