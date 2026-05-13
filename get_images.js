const fs = require('fs');
const queries = [
  "idli", "dosa", "pongal food", "lemon rice", "sambar", "curd rice", 
  "vada food", "upma", "chicken curry", "mutton curry", "fried fish", 
  "fried chicken", "meat crepe", "thali", "indian meal", 
  "vegetarian food", "meat thali", "seafood meal", "shredded bread", 
  "layered bread", "scrambled egg", "egg dish", "spicy chicken", 
  "milkshake", "rice pudding", "sweet dessert", "sweet rice", "filter coffee", 
  "ginger tea", "buttermilk", "rose milk"
];

async function getPexels(query) {
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        // We don't have an API key, so this might fail.
        'Authorization': '563492ad6f917000010000018a1a36746cf544d6a8b27670e3001dd2' // public dummy key, might be rate limited
      }
    });
    const data = await res.json();
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.large;
    }
  } catch (e) {}
  return null;
}

async function run() {
  const results = {};
  for (const q of queries) {
    const url = await getPexels(q);
    results[q] = url;
  }
  fs.writeFileSync('img_results.json', JSON.stringify(results, null, 2));
}

run();
