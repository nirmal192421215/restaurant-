const candidates = {
  "Madurai Kari Dosa": [
    "https://upload.wikimedia.org/wikipedia/commons/9/9f/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/1/1c/Dosa_with_chutney_and_sambar.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/8b/Masala_Dosa.jpg"
  ],
  "Veg Kothu Parotta": [
    "https://upload.wikimedia.org/wikipedia/commons/0/07/Kottu_roti_with_vegetables.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/3/33/Kottu_roti.jpg"
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
    for (const u of urls) {
      const ok = await checkUrl(u);
      console.log(`${dish} - ${u.split('/').pop()} => ${ok}`);
    }
  }
}
run();
