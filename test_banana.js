async function checkUrl(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
    return r.status === 200 || r.status === 429;
  } catch(e) { return false; }
}

async function run() {
  const urls = [
    "https://upload.wikimedia.org/wikipedia/commons/4/47/Banana_Leaf_Meal.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/South_Indian_Food.JPG/800px-South_Indian_Food.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Banana_leaf_thali.jpg/800px-Banana_leaf_thali.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/South_Indian_Meals_on_Banana_Leaf.jpg/800px-South_Indian_Meals_on_Banana_Leaf.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/South_Indian_Thali.jpg/800px-South_Indian_Thali.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e5/Veg_Thali.jpg"
  ];
  for (const u of urls) {
    const ok = await checkUrl(u);
    console.log(`${ok ? '✅' : '❌'} ${u}`);
  }
}
run();
