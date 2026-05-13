// Wikipedia REST API returns reliable thumbnail URLs served by Wikipedia CDN
const articles = [
  { dish: "Mutton Chukka", article: "Chettinad_cuisine" },
  { dish: "Nethili Fish Fry", article: "Anchovy" },
  { dish: "Chicken 65", article: "Chicken_65" },
  { dish: "Bun Parotta", article: "Paratha" },
  { dish: "Madurai Kalakki", article: "Scrambled_eggs" },
  { dish: "Egg Kothu Parotta", article: "Kottu_roti" },
  { dish: "Veg Kothu Parotta", article: "Kottu_roti" },
  { dish: "Madurai Jigarthanda", article: "Jigarthanda_(drink)" },
];

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
  for (const item of articles) {
    const url = await getWikiThumb(item.article);
    console.log(`${item.dish}: ${url || 'NOT_FOUND'}`);
  }
}
run();
