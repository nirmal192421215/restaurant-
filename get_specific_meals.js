// Get more specific TheMealDB images for Indian dishes
const queries = [
  "biryani", "dal", "chicken curry", "fish curry", "paneer", "sambar", "rice", "dosa", "idli", "coffee"
];

async function getMeal(q) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  if (data.meals && data.meals.length > 0) {
    return data.meals.map(m => ({ name: m.strMeal, img: m.strMealThumb }));
  }
  return [];
}

// Also get by category
async function getByCategory(cat) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(cat)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  if (data.meals) return data.meals.slice(0,3).map(m => ({ name: m.strMeal, img: m.strMealThumb }));
  return [];
}

async function run() {
  // Get chicken dishes
  const chicken = await getMeal("chicken");
  const indian = await getByCategory("Seafood");
  const dessert = await getByCategory("Dessert");
  const breakfast = await getByCategory("Breakfast");
  
  console.log("=== CHICKEN ===");
  chicken.slice(0,5).forEach(m => console.log(`${m.name}: ${m.img}`));
  
  console.log("=== SEAFOOD ===");
  indian.slice(0,5).forEach(m => console.log(`${m.name}: ${m.img}`));
  
  console.log("=== DESSERT ===");
  dessert.slice(0,5).forEach(m => console.log(`${m.name}: ${m.img}`));
  
  console.log("=== BREAKFAST ===");
  breakfast.slice(0,5).forEach(m => console.log(`${m.name}: ${m.img}`));
  
  // Get specific Indian meals
  const lamb = await getMeal("lamb");
  console.log("=== LAMB/MUTTON ===");
  lamb.slice(0,3).forEach(m => console.log(`${m.name}: ${m.img}`));
}
run();
