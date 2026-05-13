async function getWikiThumb(article) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(article)}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'FoodMenuBot/1.0' } });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch(e) { return null; }
}

async function run() {
  const articles = [
    "Thali",
    "Banana_leaf",
    "South_Indian_cuisine",
    "Tamil_cuisine"
  ];
  for (const a of articles) {
    console.log(`${a}: ${await getWikiThumb(a)}`);
  }
}
run();
