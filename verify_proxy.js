// wsrv.nl is a free image CDN that proxies any image URL - works great for hotlinking
const candidates = {
  "Mutton Chukka (cooked)": "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/9/9c/Mutton_chukka.jpg&w=800&output=jpg",
  "Nethili Fish Fry": "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/2/29/Nethili_Meen_Varuval.jpg&w=800&output=jpg",
  "Chicken 65": "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/6/64/Chicken65.jpg&w=800&output=jpg",
  "Bun Parotta": "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/0/03/Malabar_Porotta_%28cropped%29.jpg&w=800&output=jpg",
  "Kalakki (egg dish)": "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/b8/Omelette.jpg&w=800&output=jpg",
  "Egg Kothu Parotta": "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg&w=800&output=jpg",
  "Veg Kothu Parotta": "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/0/07/Kottu_roti_with_vegetables.jpg&w=800&output=jpg",
  "Jigarthanda": "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/b1/Jigarthanda_cold_drink.jpg&w=800&output=jpg",
};

async function checkUrl(url) {
  try {
    const r = await fetch(url, { method: 'HEAD' });
    return r.status;
  } catch(e) { return 'error'; }
}

async function run() {
  for (const [name, url] of Object.entries(candidates)) {
    const status = await checkUrl(url);
    console.log(`${status === 200 ? '✅' : '❌'} [${status}] ${name}`);
    console.log(`  ${url}`);
  }
}
run();
