// TheMealDB - Free API with Indian food images
const searches = [
  { name: "Chicken 65", q: "Chicken" },
  { name: "Filter Coffee", q: "Coffee" },
  { name: "Sweet Pongal", q: "Pongal" },
  { name: "Rose Milk", q: "milk" },
  { name: "Jigarthanda", q: "Dessert" },
  { name: "Banana Leaf Meals", q: "Rice" },
];

async function getMealDB(query) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    if (data.meals && data.meals.length > 0) {
      return data.meals[0].strMealThumb;
    }
  } catch(e) {}
  return null;
}

// Also test Foodish API
async function getFoodish(category) {
  const url = `https://foodish-api.com/api/images/${category}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    return data.image || null;
  } catch(e) {}
  return null;
}

async function run() {
  // Test TheMealDB
  for (const item of searches) {
    const url = await getMealDB(item.q);
    if (url) console.log(`TheMealDB - ${item.name}: ${url}`);
  }
  
  // Test Foodish categories
  const categories = ['biriyani', 'dosa', 'idly', 'butter-chicken', 'burger', 'dessert', 'pasta', 'pizza', 'rice', 'samosa'];
  for (const cat of categories) {
    const url = await getFoodish(cat);
    if (url) console.log(`Foodish - ${cat}: ${url}`);
  }
}
run();
