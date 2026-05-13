async function check(url) {
  const r = await fetch(url, { method: 'HEAD' });
  console.log(`${r.status} ${r.headers.get('content-type')} ${url}`);
}
check("https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?q=80&w=2000&auto=format&fit=crop");
check("https://images.unsplash.com/photo-1633501725547-5a23055cbdbb?q=80&w=2000&auto=format&fit=crop"); // South Indian Thali
