// Verify all URLs load as images
const urls = {
  "Mutton Chukka": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/ChickenChettinad.JPG/640px-ChickenChettinad.JPG",
  "Nethili Fish Fry": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Anchovy_closeup.jpg/640px-Anchovy_closeup.jpg",
  "Bun Parotta": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/640px-Triangle_paratha_%28cropped%29.JPG",
  "Madurai Kalakki": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Scrambed_eggs.jpg/640px-Scrambed_eggs.jpg",
  "Egg Kothu Parotta": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Chicken_Kottu.jpg/640px-Chicken_Kottu.jpg",
  "Veg Kothu Parotta": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kottu_roti_with_vegetables.jpg/640px-Kottu_roti_with_vegetables.jpg",
  "Jigarthanda": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jigarthanda.JPG/640px-Jigarthanda.JPG",
  "Chicken 65 (fallback)": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/ChickenChettinad.JPG/640px-ChickenChettinad.JPG",
};

async function check(url) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120' } });
    const ct = r.headers.get('content-type') || '';
    return `${r.status} ${ct.includes('image') ? 'IMAGE✅' : ct}`;
  } catch(e) { return `ERROR: ${e.message}`; }
}

async function run() {
  for (const [name, url] of Object.entries(urls)) {
    const result = await check(url);
    console.log(`${name}: ${result}`);
    console.log(`  ${url}`);
  }
}
run();
