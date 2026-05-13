// Use Wikimedia Commons API to search + immediately proxy via wsrv.nl
const searches = [
  { name: "Mutton Chukka", q: "mutton pepper fry cooked dry" },
  { name: "Nethili Fish Fry", q: "fried anchovy fish south india" },
  { name: "Chicken 65", q: "chicken 65 fried indian appetizer" },
  { name: "Kalakki", q: "scrambled eggs fried" },
  { name: "Veg Kothu Parotta", q: "kottu roti vegetable parotta" },
  { name: "Jigarthanda", q: "jigarthanda madurai cold milk dessert drink" },
];

async function searchAndGet(query) {
  await new Promise(r => setTimeout(r, 800));
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=10&utf8=1&origin=*`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'FoodBot/1.0 (example@gmail.com)', 'Accept': 'application/json' }
    });
    const data = await res.json();
    if (!data.query?.search?.length) return [];
    return data.query.search.map(r => r.title.replace('File:', ''));
  } catch(e) {
    console.error("Error:", e.message);
    return [];
  }
}

async function getFileUrl(filename) {
  await new Promise(r => setTimeout(r, 500));
  const title = `File:${filename}`;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(title)}&format=json&origin=*`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'FoodBot/1.0' } });
    const data = await res.json();
    const p = Object.values(data.query.pages)[0];
    return p?.imageinfo?.[0]?.url || null;
  } catch(e) { return null; }
}

async function checkWsrv(wikimediaUrl) {
  if (!wikimediaUrl) return false;
  // Convert to wsrv proxy
  const clean = wikimediaUrl.replace('https://', '');
  const proxyUrl = `https://wsrv.nl/?url=${clean}&w=800`;
  try {
    const r = await fetch(proxyUrl, { method: 'HEAD' });
    if (r.status === 200) return proxyUrl;
  } catch(e) {}
  return false;
}

async function run() {
  for (const item of searches) {
    const filenames = await searchAndGet(item.q);
    let found = null;
    for (const fname of filenames.slice(0, 5)) {
      if (!/\.(jpg|jpeg|png|JPG|JPEG)$/i.test(fname)) continue;
      const directUrl = await getFileUrl(fname);
      if (!directUrl) continue;
      const proxyUrl = await checkWsrv(directUrl);
      if (proxyUrl) {
        found = { file: fname, url: proxyUrl, direct: directUrl };
        break;
      }
    }
    if (found) {
      console.log(`✅ ${item.name}: ${found.url}`);
      console.log(`   (file: ${found.file})`);
    } else {
      console.log(`❌ ${item.name}: not found`);
      if (filenames.length) console.log(`   Tried: ${filenames.slice(0,3).join(', ')}`);
    }
  }
}
run();
