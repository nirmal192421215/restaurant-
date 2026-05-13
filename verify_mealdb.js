// Verify all TheMealDB URLs we plan to use
const mapping = {
  "Chicken 65": "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
  "Non-Veg Meals": "https://www.themealdb.com/images/media/meals/er4d081765186828.jpg",
  "Banana Leaf Full Meals": "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
  "Mini Meals": "https://www.themealdb.com/images/media/meals/5r5rvx1763287943.jpg",
  "Veg Meals": "https://www.themealdb.com/images/media/meals/bopa2i1683209167.jpg",
  "Fish Meals": "https://www.themealdb.com/images/media/meals/1548772327.jpg",
  "Sweet Pongal": "https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg",
  "Filter Coffee": "https://www.themealdb.com/images/media/meals/1529446352.jpg",
  "Rose Milk": "https://www.themealdb.com/images/media/meals/wkhg581762773124.jpg",
  "Madurai Jigarthanda": "https://www.themealdb.com/images/media/meals/a4kgf21763075288.jpg",
  "Mutton Chukka": "https://www.themealdb.com/images/media/meals/vvstvq1487342592.jpg",
  "Nethili Fish Fry": "https://www.themealdb.com/images/media/meals/jc6oub1763196663.jpg",
  "Bun Parotta": "https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg",
  "Madurai Kalakki": "https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg",
  "Egg Kothu Parotta": "https://www.themealdb.com/images/media/meals/1550441882.jpg",
};

async function check(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
    const ct = r.headers.get('content-type') || '';
    return r.status === 200 && ct.includes('image') ? '✅ OK' : `❌ ${r.status}`;
  } catch(e) { return '❌ ERR'; }
}

async function run() {
  for (const [dish, url] of Object.entries(mapping)) {
    const result = await check(url);
    console.log(`${result} ${dish}`);
  }
}
run();
