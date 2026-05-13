const dishes = [
  "Nethili",
  "Chicken 65",
  "Kari Dosa",
  "Kothu Parotta",
  "Parotta",
  "Jigarthanda (drink)",
  "Payasam",
  "Sweet Pongal",
  "Indian filter coffee",
  "Dry ginger coffee",
  "Rose milk"
];

async function getWiki(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}&redirects=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== "-1" && pages[pageId].original) {
      return pages[pageId].original.source;
    }
  } catch(e) {}
  
  // Try search
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(title)}&format=json&utf8=1`;
  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    if (data.query.search.length > 0) {
      const firstTitle = data.query.search[0].title;
      const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(firstTitle)}&redirects=1`;
      const imgRes = await fetch(imgUrl);
      const imgData = await imgRes.json();
      const p = imgData.query.pages;
      const pId = Object.keys(p)[0];
      if (pId !== "-1" && p[pId].original) {
        return p[pId].original.source;
      }
    }
  } catch(e) {}
  
  return null;
}

async function run() {
  for(let i=0; i<dishes.length; i++) {
    const url = await getWiki(dishes[i]);
    console.log(dishes[i], "=>", url || "NOT_FOUND");
  }
}
run();
