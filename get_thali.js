const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/4/46/South_Indian_Meals_served_on_a_Banana_Leaf.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/df/South_Indian_Food.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/b/b8/Non-veg_thali.jpg",
  "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?q=80&w=2000&auto=format&fit=crop"
];
async function check(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
    const ct = r.headers.get('content-type') || '';
    return r.status === 200 && ct.includes('image');
  } catch(e) { return false; }
}

async function run() {
  for (const u of urls) {
    console.log(`${await check(u) ? '✅' : '❌'} ${u}`);
  }
}
run();
