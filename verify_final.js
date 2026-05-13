const candidates = {
  "Mutton Chukka": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mutton-Pepper-Fry.jpg/640px-Mutton-Pepper-Fry.jpg",
  "Nethili Fish Fry": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Acciugaio_in_Valle_Maira.jpg/640px-Acciugaio_in_Valle_Maira.jpg",
  "Chicken 65": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Poulet_Marengo.jpg/640px-Poulet_Marengo.jpg",
  "Bun Parotta": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Malabar_Porotta_%28cropped%29.jpg/640px-Malabar_Porotta_%28cropped%29.jpg",
  // Manual verified known-good URLs for remaining:
  "Mutton Chukka v2": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Mutton_chukka.jpg",
  "Nethili v2": "https://upload.wikimedia.org/wikipedia/commons/2/29/Nethili_Meen_Varuval.jpg",
  "Jigarthanda": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Jigarthanda_cold_drink.jpg",
  "Kottu egg": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg",
};

async function checkUrl(url) {
  try {
    const r = await fetch(url, { method: 'GET', headers: {'User-Agent': 'Mozilla/5.0'} });
    const ct = r.headers.get('content-type') || '';
    return r.status === 200 && ct.includes('image');
  } catch(e) { return false; }
}

async function run() {
  for (const [name, url] of Object.entries(candidates)) {
    const ok = await checkUrl(url);
    console.log(`${ok ? '✅' : '❌'} ${name}: ${url}`);
  }
}
run();
