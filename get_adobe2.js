// Try fetching the raw Adobe Stock JSON API
const queries = [
  { name: "Chicken 65", q: "chicken 65 indian food" },
  { name: "Banana Leaf Meals", q: "banana leaf south indian meals" },
  { name: "Filter Coffee", q: "south indian filter coffee" },
  { name: "Rose Milk", q: "rose milk pink drink india" },
  { name: "Jigarthanda", q: "jigarthanda cold drink" },
];

async function fetchAdobe(query) {
  const url = `https://stock.adobe.com/Rest/Media/1/Search/Files?locale=en_US&search_parameters[words]=${encodeURIComponent(query)}&search_parameters[limit]=3&search_parameters[filters][content_type:photo]=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'x-api-key': 'stock1',
        'User-Agent': 'Mozilla/5.0 Chrome/120',
        'Accept': 'application/json',
      }
    });
    const text = await res.text();
    console.log(`Status: ${res.status}, Body snippet: ${text.substring(0, 300)}`);
  } catch(e) {
    console.log(`Error: ${e.message}`);
  }
}

fetchAdobe("chicken 65 indian food");
