// Use EXACTLY the URLs returned from Wikipedia REST API (330px size - this is what they gave us)
const urls = {
  "Mutton Chukka": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/ChickenChettinad.JPG/330px-ChickenChettinad.JPG",
  "Nethili Fish Fry": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Anchovy_closeup.jpg/330px-Anchovy_closeup.jpg",
  "Bun Parotta": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/330px-Triangle_paratha_%28cropped%29.JPG",
  "Madurai Kalakki": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Scrambed_eggs.jpg/330px-Scrambed_eggs.jpg",
  "Egg Kothu Parotta": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Chicken_Kottu.jpg/330px-Chicken_Kottu.jpg",
  "Jigarthanda": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jigarthanda.JPG/330px-Jigarthanda.JPG",
};

async function check(url) {
  try {
    const r = await fetch(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://en.wikipedia.org/',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
      } 
    });
    const ct = r.headers.get('content-type') || '';
    return `${r.status} - ${ct.substring(0, 30)}`;
  } catch(e) { return `ERROR: ${e.message}`; }
}

async function run() {
  for (const [name, url] of Object.entries(urls)) {
    const result = await check(url);
    console.log(`${name}: ${result}`);
  }
}
run();
