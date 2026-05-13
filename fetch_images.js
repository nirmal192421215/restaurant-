const dishes = [
  "Idli", "Dosa", "Ven Pongal", "Lemon Rice", "Sambar Rice", "Curd Rice", 
  "Medu Vada", "Upma", "Chettinad Chicken", "Mutton Chukka", "Fried fish", 
  "Chicken 65", "Kari Dosa", "Banana leaf meal", "South Indian Meals", 
  "Vegetarian Thali", "Non veg thali", "Fish thali", "Kothu Parotta", 
  "Bun Parotta", "Kalakki", "Egg Kothu Parotta", "Chicken Kothu Parotta", 
  "Jigarthanda", "Payasam", "Kesari", "Sweet Pongal", "Filter Coffee", 
  "Sukku Coffee", "Buttermilk", "Rose Milk"
];

async function fetchWikiImage(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(query)}&redirects=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== "-1" && pages[pageId].original) {
      return pages[pageId].original.source;
    }
  } catch (e) {}
  
  // Try search API if title match fails
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&utf8=1`;
  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    if (data.query.search.length > 0) {
      const title = data.query.search[0].title;
      const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}&redirects=1`;
      const imgRes = await fetch(imgUrl);
      const imgData = await imgRes.json();
      const p = imgData.query.pages;
      const pId = Object.keys(p)[0];
      if (pId !== "-1" && p[pId].original) {
        return p[pId].original.source;
      }
    }
  } catch (e) {}
  
  return null;
}

async function run() {
  const results = {};
  for (const dish of dishes) {
    const img = await fetchWikiImage(dish);
    results[dish] = img;
  }
  console.log(JSON.stringify(results, null, 2));
}

run();
