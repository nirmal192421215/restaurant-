// Try different filenames from Wikimedia Commons
const candidates = [
  // Mutton Chukka
  ["Mutton Chukka", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/f/f8/Mutton_pepper_fry.jpg&w=800"],
  ["Mutton Chukka", "https://wsrv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Mutton_Pepper_Fry.jpg&w=800"],
  ["Mutton Chukka", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/5/57/Chettinad_mutton.jpg&w=800"],
  ["Mutton Chukka", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9c/Mutton_fry.jpg&w=800"],
  // Nethili Fish Fry
  ["Nethili", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/4/4f/Nethili_fish_fry.jpg&w=800"],
  ["Nethili", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/5/5c/Fried_anchovies.jpg&w=800"],
  ["Nethili", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/en/2/29/Nethili_Meen_Varuval.jpg&w=800"],
  // Chicken 65
  ["Chicken 65", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/9/94/Chicken_65.jpg&w=800"],
  ["Chicken 65", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/en/6/64/Chicken65.jpg&w=800"],
  // Kalakki
  ["Kalakki", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/2/20/Scrambled_eggs.jpg&w=800"],
  ["Kalakki", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/3/3f/Scrambled_eggs.jpg&w=800"],
  ["Kalakki", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/5/57/Scrambled_eggs_with_ham.jpg&w=800"],
  // Veg Kothu
  ["Veg Kothu", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/0/07/Kottu_roti.jpg&w=800"],
  ["Veg Kothu", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/en/0/07/Kottu_roti_with_vegetables.jpg&w=800"],
  // Jigarthanda
  ["Jigarthanda", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/en/b/b1/Jigarthanda_cold_drink.jpg&w=800"],
  ["Jigarthanda", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/6/63/Jigarthanda.jpg&w=800"],
  ["Jigarthanda", "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/en/6/63/Jigarthanda.jpg&w=800"],
];

async function checkUrl(url) {
  try {
    const r = await fetch(url, { method: 'HEAD' });
    return r.status;
  } catch(e) { return 'error'; }
}

async function run() {
  for (const [name, url] of candidates) {
    const status = await checkUrl(url);
    if (status === 200) console.log(`✅ ${name}: ${url}`);
  }
  console.log("Done");
}
run();
