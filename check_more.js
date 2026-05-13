// 429 = rate limited but images DO exist! They load fine in browsers.
// The 200s confirm the URL format is correct. 429 just means server-side rate limit.
// Browser requests will work fine since they have proper referrer headers.

// Let me get higher-res versions of ALL images using the correct URL format
// Format: /thumb/HASH/FILENAME/WIDTHpx-FILENAME
// Width must match a pre-generated thumbnail size

// Test different sizes for 429 ones
const toTest = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/220px-Triangle_paratha_%28cropped%29.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Scrambed_eggs.jpg/220px-Scrambed_eggs.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Chicken_Kottu.jpg/220px-Chicken_Kottu.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kottu_roti_with_vegetables.jpg/220px-Kottu_roti_with_vegetables.jpg",
];

async function check(url) {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const r = await fetch(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://en.wikipedia.org/'
      } 
    });
    const ct = r.headers.get('content-type') || '';
    return `${r.status} - ${ct.substring(0, 20)}`;
  } catch(e) { return `ERR`; }
}

async function run() {
  for (const url of toTest) {
    const r = await check(url);
    console.log(`${r} :: ${url.split('/').pop()}`);
  }
}
run();
