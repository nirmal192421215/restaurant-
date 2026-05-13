const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/5/5c/Fried_Anchovies.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/2/23/Chicken_65_%28Dish%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1c/Dosa_with_chutney_and_sambar.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/34/Kerala_Porotta.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/07/Kottu_roti_with_vegetables.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/63/Jigarthanda_Drink.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/da/Semiya_Payasam.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/df/Sakkarai_Pongal.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4c/Indian_filter_coffee_in_traditional_tumbler_and_dabarah.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1a/Ginger_tea.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fe/Rose_milk.jpg"
];
async function check() {
  for (const u of urls) {
    try {
      const r = await fetch(u, {method: 'HEAD'});
      console.log(u.split('/').pop(), "=>", r.status);
    } catch(e) {}
  }
}
check();
