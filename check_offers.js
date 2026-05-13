const urls = {
  "Banana Leaf Feast": "https://images.unsplash.com/photo-1601050648497-3f9eba95b58e?q=80&w=2000&auto=format&fit=crop",
  "Street Food Night": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2000&auto=format&fit=crop",
  "Chettinad Spice": "https://images.unsplash.com/photo-1603894584214-5d34245d7a0c?q=80&w=2000&auto=format&fit=crop",
  "Filter Coffee": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2000&auto=format&fit=crop",
};
async function check(url) {
  try {
    const r = await fetch(url, { method: 'HEAD' });
    const ct = r.headers.get('content-type') || '';
    return `${r.status} ${ct.includes('image') ? '✅' : '❌ ' + ct.slice(0,30)}`;
  } catch(e) { return `❌ ${e.message}`; }
}
async function run() {
  for (const [name, url] of Object.entries(urls)) {
    console.log(`${name}: ${await check(url)}`);
  }
}
run();
