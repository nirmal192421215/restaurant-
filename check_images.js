const ids = [
  "GnMPlrfmxOw", "r8ZhiygCjXM", "5oF7d_hPJG4", "9xAHzmdF0NY", "gFB1IPmH6RE", 
  "DllPL45UdFQ", "5I4faGfaUHg", "GXXt3CWwTbw", "T_vb0zXgZEU", "lY2m5lxJrmQ", 
  "MlKvNMjO_14", "VIqcVqZ1uxM", "hXbhqTPPHfs", "7yb08BMYhmQ", "o6ZmzH5GniU", 
  "B20gwjOTjyw", "SPYjm09zjBg", "e2b0-q7gjgg", "8qk22RCHLNo", "Fv3uNhZVMJU", 
  "BnWWT42yymI", "S4ts37KgzYo", "UcyRc8jeQNg", "fOImEFq1eRo", "yCIcDyKm440",
  "ZN-TT10kf4o", "AcCzVNZDRJE", "0j4bisyPo3M", "0pfEWFA2hVE", "Q9lxsv6bwK8", "T76zb0xl27Q"
];

async function check() {
  for (const id of ids) {
    const url = `https://images.unsplash.com/photo-${id}?q=80&w=800&auto=format&fit=crop`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`${id}: ${res.status}`);
    } catch (e) {
      console.log(`${id}: error`);
    }
  }
}
check();
