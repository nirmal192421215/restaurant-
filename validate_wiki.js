// Known good URLs from Wikipedia Commons for these Tamil Nadu dishes
const candidates = {
  "Nethili Fish Fry": [
    "https://upload.wikimedia.org/wikipedia/commons/2/29/Nethili_Meen_Varuval.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Dry_fish_India.jpg/640px-Dry_fish_India.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/f/f3/Fish_fry_Tamil.jpg"
  ],
  "Chicken 65": [
    "https://upload.wikimedia.org/wikipedia/commons/6/64/Chicken65.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d3/Chicken-65.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/c/c2/Chicken_65_2.jpg"
  ],
  "Kothu Parotta": [
    "https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/8b/Kothu_parota.jpg"
  ],
  "Bun Parotta": [
    "https://upload.wikimedia.org/wikipedia/commons/3/34/Kerala_Porotta.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/9/90/Parotta.jpg"
  ],
  "Jigarthanda": [
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Jigarthanda_cold_drink.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/6/63/Jigarthanda.jpg"
  ],
  "Filter Coffee": [
    "https://upload.wikimedia.org/wikipedia/commons/4/4c/Indian_filter_coffee_in_traditional_tumbler_and_dabarah.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a8/TEDxAMS2011_044.JPG"
  ],
  "Rose Milk": [
    "https://upload.wikimedia.org/wikipedia/commons/f/fe/Rose_milk.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/7b/Rose_milk_glass.jpg"
  ],
  "Sweet Pongal": [
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Sakkarai_Pongal.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/9/97/Pongal_sweet.jpg"
  ],
  "Sukku Coffee": [
    "https://upload.wikimedia.org/wikipedia/commons/1/1a/Ginger_tea.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ginger_herbal_tea.jpg"
  ],
  "Semiya Payasam": [
    "https://upload.wikimedia.org/wikipedia/commons/4/46/Kheer.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/da/Semiya_Payasam.jpg"
  ]
};

async function checkUrl(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
    return r.status === 200 || r.status === 429;
  } catch(e) { return false; }
}

async function run() {
  for (const [dish, urls] of Object.entries(candidates)) {
    let found = false;
    for (const u of urls) {
      const ok = await checkUrl(u);
      if (ok) {
        console.log(`${dish} => ${u}`);
        found = true;
        break;
      }
    }
    if (!found) console.log(`${dish} => NOT_FOUND`);
  }
}
run();
