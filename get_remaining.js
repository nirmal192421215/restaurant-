const dishes = [
  { name: "Madurai Kalakki", queries: ["Kottu roti egg", "Kalakki Madurai"] },
  { name: "Egg Kothu Parotta", queries: ["Kothu parotta egg"] },
  { name: "Veg Kothu Parotta", queries: ["Vegetable kottu roti"] },
  { name: "Madurai Jigarthanda", queries: ["Jigarthanda"] },
];

async function searchCommonsAPI(query) {
  await new Promise(r => setTimeout(r, 500));
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=5&utf8=1`;
  const res = await fetch(url, { headers: {'User-Agent': 'FoodMenuBot/1.0'} });
  const data = await res.json();
  if (!data.query?.search?.length) return null;
  for (const r of data.query.search) {
    const title = r.title;
    const imgUrl = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(title)}&format=json`;
    await new Promise(r => setTimeout(r, 300));
    const imgRes = await fetch(imgUrl, { headers: {'User-Agent': 'FoodMenuBot/1.0'} });
    const imgData = await imgRes.json();
    const p = Object.values(imgData.query.pages)[0];
    if (p?.imageinfo?.[0]?.url) {
      const src = p.imageinfo[0].url;
      if (/\.(jpg|jpeg|png|JPG|JPEG)$/.test(src)) return src;
    }
  }
  return null;
}

async function run() {
  for (const dish of dishes) {
    let found = null;
    for (const q of dish.queries) {
      found = await searchCommonsAPI(q);
      if (found) break;
    }
    console.log(`${dish.name} => ${found || "NOT_FOUND"}`);
  }
}
run();
