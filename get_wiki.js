const fs = require('fs');
const dishes = [
  "Idli", "Dosa", "Pongal (dish)", "Lemon rice", "Sambar", "Curd rice", 
  "Vada (food)", "Upma", "Chettinad cuisine", "Mutton", "Fried fish", 
  "Chicken 65", "Parotta", "Banana leaf", "Thali", "Vegetarianism", 
  "Non-vegetarian", "Fish as food", "Kothu Parotta", 
  "Egg (food)", "Jigarthanda (drink)", "Kheer", "Kesari bat", "Filter coffee", 
  "Ginger tea", "Buttermilk", "Rose milk"
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
  return null;
}

async function run() {
  const map = {};
  for(let i=0; i<dishes.length; i++) {
    const url = await getWiki(dishes[i]);
    if(url) {
      map[dishes[i]] = url;
      console.log(dishes[i], "=>", url);
    }
  }
}
run();
