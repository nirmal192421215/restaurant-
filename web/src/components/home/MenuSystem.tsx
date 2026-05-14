"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Star, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

type MealTime = "Breakfast" | "Lunch" | "Dinner";
type Category = "All" | "Veg" | "Non-Veg" | "Tiffin" | "Meals" | "Street Food" | "Desserts" | "Drinks";

interface MenuItem {
  id: string;
  name: string;
  tamilName?: string;
  description: string;
  ingredients: string;
  price: number;
  image: string;
  isVeg: boolean;
  category: Category[];
  mealTime: MealTime[];
  isBestseller?: boolean;
  isSoldOut?: boolean;
  spiceLevel?: number;
}

const MENU_ITEMS: MenuItem[] = [
  // --- VEG (காலை & மதியம்) ---
  {
    id: "v1",
    name: "Kanchipuram Idli",
    tamilName: "காஞ்சிபுரம் இட்லி",
    ingredients: "Rice, urad dal, pepper, cumin, ginger, curry leaves, ghee",
    description: "Soft steamed idli seasoned with traditional temple spices and ghee.",
    price: 80,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.JPG",
    isVeg: true,
    category: ["All", "Veg", "Tiffin"],
    mealTime: ["Breakfast"],
    spiceLevel: 1,
    isBestseller: true,
  },
  {
    id: "v2",
    name: "Ghee Roast Dosa",
    tamilName: "நெய் ரோஸ்ட் தோசை",
    ingredients: "Fermented rice & urad dal batter, pure cow ghee",
    description: "Paper-thin crispy dosa roasted with generous amounts of pure ghee.",
    price: 90,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg",
    isVeg: true,
    category: ["All", "Veg", "Tiffin"],
    mealTime: ["Breakfast"],
    spiceLevel: 0,
  },
  {
    id: "v3",
    name: "Ven Pongal",
    tamilName: "வெண் பொங்கல்",
    ingredients: "Rice, moong dal, pepper, cumin, ginger, cashew, ghee",
    description: "Creamy rice and lentil porridge tempered with black pepper and cashews.",
    price: 70,
    image: "/menu/ven-pongal-new.jpg",
    isVeg: true,
    category: ["All", "Veg", "Tiffin"],
    mealTime: ["Breakfast"],
    spiceLevel: 1,
  },
  {
    id: "v4",
    name: "Lemon Rice",
    tamilName: "எலுமிச்சை சாதம்",
    ingredients: "Rice, lemon juice, mustard, peanuts, turmeric, curry leaves",
    description: "Tangy and refreshing rice tempered with crunchy peanuts and lemon.",
    price: 80,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Chitranna_and_Payasa.jpg",
    isVeg: true,
    category: ["All", "Veg"],
    mealTime: ["Lunch"],
    spiceLevel: 1,
  },
  {
    id: "v5",
    name: "Sambar Sadam",
    tamilName: "சாம்பார் சாதம்",
    ingredients: "Rice, toor dal, tamarind, vegetables, sambar powder, ghee",
    description: "Comfort rice dish slow-cooked with lentils, vegetables, and aromatic spices.",
    price: 110,
    image: "/menu/sambar-sadam-new.png",
    isVeg: true,
    category: ["All", "Veg"],
    mealTime: ["Lunch"],
    spiceLevel: 2,
  },
  {
    id: "v6",
    name: "Curd Rice",
    tamilName: "தயிர் சாதம்",
    ingredients: "Rice, yogurt, pomegranate, mustard seeds, curry leaves",
    description: "Cooling and creamy yogurt rice tempered with mild spices.",
    price: 70,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Curd_Rice.jpg",
    isVeg: true,
    category: ["All", "Veg"],
    mealTime: ["Lunch"],
  },
  {
    id: "v7",
    name: "Medhu Vada",
    tamilName: "மெது வடை",
    ingredients: "Urad dal, peppercorns, curry leaves, ginger",
    description: "Crispy deep-fried lentil donuts served with coconut chutney and sambar.",
    price: 50,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Medu_Vadas.JPG",
    isVeg: true,
    category: ["All", "Veg", "Tiffin"],
    mealTime: ["Breakfast"],
    spiceLevel: 1,
  },
  {
    id: "v8",
    name: "Rava Upma",
    tamilName: "ரவா உப்புமா",
    ingredients: "Semolina, mustard seeds, urad dal, green chilies, vegetables",
    description: "Savory semolina porridge cooked with fresh vegetables and tempered spices.",
    price: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/86/A_photo_of_Upma.jpg",
    isVeg: true,
    category: ["All", "Veg", "Tiffin"],
    mealTime: ["Breakfast"],
    spiceLevel: 1,
  },

  // --- NON-VEG (மதியம் & இரவு) ---
  {
    id: "nv1",
    name: "Chettinad Chicken Curry",
    tamilName: "செட்டிநாடு சிக்கன்",
    ingredients: "Chicken, poppy seeds, fennel, dried red chilies, coconut",
    description: "Robust and fiery chicken curry cooked with freshly ground Chettinad spices.",
    price: 220,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/ChickenChettinad.JPG",
    isVeg: false,
    category: ["All", "Non-Veg"],
    mealTime: ["Lunch", "Dinner"],
    isBestseller: true,
    spiceLevel: 3,
  },
  {
    id: "nv2",
    name: "Mutton Chukka",
    tamilName: "மட்டன் சுக்கா",
    ingredients: "Tender mutton, small onions, garlic, pepper, curry leaves",
    description: "Traditional dry-roasted mutton dish with a powerful kick of black pepper.",
    price: 280,
    image: "https://www.themealdb.com/images/media/meals/vvstvq1487342592.jpg",
    isVeg: false,
    category: ["All", "Non-Veg"],
    mealTime: ["Lunch", "Dinner"],
    spiceLevel: 3,
  },
  {
    id: "nv3",
    name: "Nethili Fish Fry",
    tamilName: "நெத்திலி வறுவல்",
    ingredients: "Anchovies, red chili powder, turmeric, curry leaves, oil",
    description: "Crispy fried small anchovies marinated in traditional coastal spices.",
    price: 160,
    image: "/menu/nethili-fry-new.png",
    isVeg: false,
    category: ["All", "Non-Veg"],
    mealTime: ["Lunch", "Dinner"],
    spiceLevel: 2,
  },
  {
    id: "nv4",
    name: "Chicken 65",
    tamilName: "சிக்கன் 65",
    ingredients: "Chicken, curd, chili powder, curry leaves, ginger garlic paste",
    description: "Classic deep-fried spicy chicken bites packed with regional flavors.",
    price: 160,
    image: "/assets/chicken-65.jpg",
    isVeg: false,
    category: ["All", "Non-Veg"],
    mealTime: ["Lunch", "Dinner"],
    spiceLevel: 2,
  },
  {
    id: "nv5",
    name: "Madurai Kari Dosa",
    tamilName: "மதுரை கறி தோசை",
    ingredients: "Dosa batter, minced mutton, egg, pepper, spices",
    description: "Iconic Madurai thick dosa topped with a spicy layer of mutton and egg masala.",
    price: 190,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg",
    isVeg: false,
    category: ["All", "Non-Veg", "Tiffin"],
    mealTime: ["Dinner"],
    isBestseller: true,
    spiceLevel: 3,
  },

  // --- MEALS (மதியம்) ---
  {
    id: "m1",
    name: "Banana Leaf Full Meals",
    tamilName: "வாழை இலை சாப்பாடு",
    ingredients: "Rice, Sambar, Rasam, 2 Poriyals, Kootu, Curd, Appalam, Payasam",
    description: "The ultimate Tamil feast served traditionally on a fresh banana leaf.",
    price: 220,
    image: "/assets/banana-leaf-feast.jpg",
    isVeg: true,
    category: ["All", "Veg", "Meals"],
    mealTime: ["Lunch"],
    isBestseller: true,
  },
  {
    id: "m2",
    name: "Mini Meals",
    tamilName: "மினி சாப்பாடு",
    ingredients: "Sambar Rice, Curd Rice, Lemon Rice, Sweet, Appalam",
    description: "A quick, satisfying assortment of traditional mixed rice dishes.",
    price: 120,
    image: "/assets/mini-meals.jpg",
    isVeg: true,
    category: ["All", "Veg", "Meals"],
    mealTime: ["Lunch"],
  },
  {
    id: "m3",
    name: "Veg Meals",
    tamilName: "சைவ சாப்பாடு",
    ingredients: "Rice, Veg Kurma, Sambar, Rasam, Poriyal",
    description: "Standard vegetarian thali for a wholesome everyday lunch.",
    price: 160,
    image: "/assets/veg-meals.png",
    isVeg: true,
    category: ["All", "Veg", "Meals"],
    mealTime: ["Lunch"],
  },
  {
    id: "m4",
    name: "Non-Veg Meals",
    tamilName: "அசைவ சாப்பாடு",
    ingredients: "Rice, Chicken Gravy, Mutton Gravy, Rasam, Egg",
    description: "Hearty meat-lovers thali served with rich gravies and boiled egg.",
    price: 220,
    image: "/assets/non-veg-meals.jpg",
    isVeg: false,
    category: ["All", "Non-Veg", "Meals"],
    mealTime: ["Lunch"],
  },
  {
    id: "m5",
    name: "Fish Meals",
    tamilName: "மீன் சாப்பாடு",
    ingredients: "Rice, Fish Curry, Fish Fry, Rasam, Poriyal",
    description: "Coastal style rice meal served with spicy fish curry and crispy fried anchovies.",
    price: 280,
    image: "/assets/fish-meals.jpg",
    isVeg: false,
    category: ["All", "Non-Veg", "Meals"],
    mealTime: ["Lunch"],
    spiceLevel: 3,
  },

  // --- STREET FOOD (இரவு) ---
  {
    id: "st1",
    name: "Chicken Kothu Parotta",
    tamilName: "சிக்கன் கொத்து புரோட்டா",
    ingredients: "Shredded parotta, spicy chicken gravy, egg, onion, salna",
    description: "Parotta shredded and tossed on a hot griddle with chicken, eggs, and masala.",
    price: 150,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg",
    isVeg: false,
    category: ["All", "Non-Veg", "Street Food"],
    mealTime: ["Dinner"],
    spiceLevel: 3,
  },
  {
    id: "st2",
    name: "Bun Parotta with Salna",
    tamilName: "பன் புரோட்டா",
    ingredients: "Refined flour, milk, egg (for dough), served with spicy veg/non-veg salna",
    description: "Soft, flaky, multi-layered bun-shaped parotta from the heart of Madurai.",
    price: 90,
    image: "/menu/bun-parotta-salna-new.jpg",
    isVeg: true,
    category: ["All", "Veg", "Street Food"],
    mealTime: ["Dinner"],
    spiceLevel: 2,
  },
  {
    id: "st3",
    name: "Madurai Kalakki",
    tamilName: "மதுரை கலக்கி",
    ingredients: "Egg, chicken salna, black pepper",
    description: "Soft-centered scrambled egg pocket mixed with flavorful meat gravy.",
    price: 50,
    image: "/menu/madurai-kalakki-new.png",
    isVeg: false,
    category: ["All", "Non-Veg", "Street Food"],
    mealTime: ["Dinner"],
    spiceLevel: 2,
  },
  {
    id: "st4",
    name: "Egg Kothu Parotta",
    tamilName: "முட்டை கொத்து புரோட்டா",
    ingredients: "Shredded parotta, egg, onion, pepper, salna",
    description: "Street-style shredded parotta tossed exclusively with eggs and pepper masala.",
    price: 120,
    image: "/menu/egg-kothu-new.jpg",
    isVeg: false,
    category: ["All", "Non-Veg", "Street Food"],
    mealTime: ["Dinner"],
    spiceLevel: 2,
  },
  {
    id: "st5",
    name: "Veg Kothu Parotta",
    tamilName: "வெஜ் கொத்து புரோட்டா",
    ingredients: "Shredded parotta, mixed vegetables, veg kurma",
    description: "Vegetarian version of the classic street food, tossed with fresh veggies.",
    price: 110,
    image: "/menu/veg-kothu-new.jpg",
    isVeg: true,
    category: ["All", "Veg", "Street Food"],
    mealTime: ["Dinner"],
    spiceLevel: 2,
  },

  // --- DESSERTS (All Day) ---
  {
    id: "ds1",
    name: "Madurai Jigarthanda",
    tamilName: "மதுரை ஜிகர்தண்டா",
    ingredients: "Reduced milk, badam pisin, sarsaparilla, handmade ice cream",
    description: "The pride of Madurai - a cooling, thick, and creamy almond resin drink.",
    price: 90,
    image: "/menu/jigarthanda-new.png",
    isVeg: true,
    category: ["All", "Veg", "Desserts"],
    mealTime: ["Lunch", "Dinner"],
    isBestseller: true,
  },
  {
    id: "ds2",
    name: "Semiya Payasam",
    tamilName: "சேமியா பாயசம்",
    ingredients: "Vermicelli, milk, cardamom, saffron, cashews",
    description: "Traditional sweet pudding made with roasted vermicelli and creamy milk.",
    price: 70,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Kheer.jpg",
    isVeg: true,
    category: ["All", "Veg", "Desserts"],
    mealTime: ["Lunch", "Dinner"],
  },
  {
    id: "ds3",
    name: "Paal Kesari",
    tamilName: "பால் கேசரி",
    ingredients: "Semolina, sugar, ghee, saffron, raisins",
    description: "Golden semolina pudding cooked with pure ghee and aromatic saffron.",
    price: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/92/KEsari_baat.jpg",
    isVeg: true,
    category: ["All", "Veg", "Desserts"],
    mealTime: ["Breakfast", "Lunch", "Dinner"],
  },
  {
    id: "ds4",
    name: "Sweet Pongal",
    tamilName: "சர்க்கரை பொங்கல்",
    ingredients: "Rice, moong dal, jaggery, ghee, cashews, cardamom",
    description: "Divine temple-style sweet rice cooked with rich jaggery and ghee.",
    price: 80,
    image: "/menu/sweet-pongal-new.jpg",
    isVeg: true,
    category: ["All", "Veg", "Desserts"],
    mealTime: ["Breakfast", "Lunch", "Dinner"],
  },

  // --- DRINKS (All Day) ---
  {
    id: "dr1",
    name: "Filter Degree Coffee",
    tamilName: "பில்டர் காபி",
    ingredients: "Brass-filter coffee decoction, frothy milk, sugar",
    description: "Authentic South Indian degree coffee with a perfect foam and aroma.",
    price: 40,
    image: "/menu/filter-coffee-new.jpg",
    isVeg: true,
    category: ["All", "Veg", "Drinks"],
    mealTime: ["Breakfast", "Lunch", "Dinner"],
  },
  {
    id: "dr2",
    name: "Sukku Coffee",
    tamilName: "சுக்கு காபி",
    ingredients: "Dry ginger, coriander seeds, palm jaggery",
    description: "Traditional herbal coffee brewed with dry ginger to aid digestion.",
    price: 35,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Ginger_tea.jpg",
    isVeg: true,
    category: ["All", "Veg", "Drinks"],
    mealTime: ["Breakfast", "Lunch", "Dinner"],
  },
  {
    id: "dr3",
    name: "Neer Mor (Buttermilk)",
    tamilName: "நீர் மோர்",
    ingredients: "Yogurt, ginger, green chili, curry leaves, asafetida",
    description: "Spiced cooling buttermilk, the perfect companion for a spicy meal.",
    price: 40,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Buttermilk-%28right%29-and-Milk-%28left%29.jpg",
    isVeg: true,
    category: ["All", "Veg", "Drinks"],
    mealTime: ["Lunch"],
  },
  {
    id: "dr4",
    name: "Rose Milk",
    tamilName: "ரோஸ் மில்க்",
    ingredients: "Chilled milk, organic rose syrup, sabja seeds",
    description: "Classic nostalgic chilled milk flavored with aromatic rose essence.",
    price: 60,
    image: "/menu/rose-milk-new.png",
    isVeg: true,
    category: ["All", "Veg", "Drinks"],
    mealTime: ["Lunch", "Dinner"],
  }
];

export default function MenuSystem() {
  const [activeMeal, setActiveMeal] = useState<MealTime>("Dinner");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { cartItems, addItem, updateQuantity, totalItems, totalPrice, openCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 11) setActiveMeal("Breakfast");
      else if (hour >= 11 && hour < 16) setActiveMeal("Lunch");
      else setActiveMeal("Dinner");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const categories: Category[] = ["All", "Veg", "Non-Veg", "Tiffin", "Meals", "Street Food", "Desserts", "Drinks"];

  const filteredMenu = MENU_ITEMS.filter(item => {
    const timeMatch = item.mealTime.includes(activeMeal);
    const categoryMatch = activeCategory === "All" || item.category.includes(activeCategory);
    return timeMatch && categoryMatch;
  });

  const getItemQuantity = (id: string) =>
    cartItems.find((i) => i.id === id)?.quantity ?? 0;

  return (
    <section id="menu" className="py-24 bg-[var(--color-brand-cream)]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header & Meal Selector */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-brand-charcoal)] mb-4 text-center">
            Tamil Nadu Culinary Heritage
          </h2>
          <p className="text-[var(--color-brand-charcoal)]/60 text-center max-w-2xl mb-8">
            Experience authentic flavors mapped to traditional meal times. From the morning sunrise tiffin to the bustling street food of the night.
          </p>
          
          <div className="flex p-1.5 bg-[var(--color-brand-beige)] rounded-2xl md:rounded-full mb-8 relative shadow-inner overflow-x-auto no-scrollbar max-w-full">
            {(["Breakfast", "Lunch", "Dinner"] as MealTime[]).map((meal) => (
              <button
                key={meal}
                onClick={() => setActiveMeal(meal)}
                className={`relative px-5 md:px-8 py-3.5 md:py-3 rounded-xl md:rounded-full text-xs md:text-sm font-bold transition-all z-10 whitespace-nowrap flex-1 min-w-[100px] ${
                  activeMeal === meal ? "text-white" : "text-[var(--color-brand-charcoal)]/60 hover:text-[var(--color-brand-charcoal)]"
                }`}
              >
                {activeMeal === meal && (
                  <motion.div
                    layoutId="mealSelector"
                    className="absolute inset-0 bg-[var(--color-brand-orange)] rounded-xl md:rounded-full shadow-lg -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="flex flex-col md:flex-row items-center gap-0 md:gap-2">
                  <span className="text-[10px] md:text-xs opacity-80 md:opacity-100">{meal === "Breakfast" ? "காலை" : meal === "Lunch" ? "மதியம்" : "இரவு"}</span>
                  <span className="hidden md:inline opacity-40">·</span>
                  <span>{meal}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? "bg-[var(--color-brand-charcoal)] text-white" 
                    : "bg-white border border-[var(--color-brand-beige)] text-[var(--color-brand-charcoal)]/70 hover:border-[var(--color-brand-charcoal)]/30 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-[var(--color-brand-beige)] transition-all group flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-32 md:h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Veg/Non-Veg Indicator */}
                  <div className="absolute top-2 right-2 bg-white p-0.5 rounded shadow-sm border border-gray-100">
                    <div className={`w-2 h-2 rounded-sm ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>

                  {/* Bestseller Badge */}
                  {item.isBestseller && (
                    <div className="absolute top-4 left-4 bg-[var(--color-brand-orange)] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-white" />
                      சிறப்பு · BESTSELLER
                    </div>
                  )}

                  {/* Spice Level Indicator */}
                  {item.spiceLevel !== undefined && (
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < (item.spiceLevel || 0) ? "text-orange-500" : "text-gray-400 opacity-30"}`}>🌶️</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-3 md:p-6 flex flex-col flex-grow">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                    <div>
                      <span className="text-[var(--color-brand-orange)] text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 block">
                        {item.tamilName}
                      </span>
                      <h3 className="text-sm md:text-xl font-heading font-bold text-[var(--color-brand-charcoal)] group-hover:text-[var(--color-brand-orange)] transition-colors pr-2 leading-tight">
                        {item.name}
                      </h3>
                    </div>
                    <span className="text-sm md:text-xl font-bold text-[var(--color-brand-orange)] mt-1">₹{item.price}</span>
                  </div>
                  
                  <p className="hidden md:block text-[var(--color-brand-charcoal)]/80 text-xs md:text-sm mb-4 line-clamp-2 italic">
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    <div className="hidden md:block text-[9px] uppercase tracking-widest font-bold text-[var(--color-brand-charcoal)]/40 mb-1">Ingredients</div>
                    <p className="hidden md:block text-[10px] text-[var(--color-brand-charcoal)]/60 leading-relaxed mb-6 h-8 line-clamp-2">
                      {item.ingredients}
                    </p>

                    {getItemQuantity(item.id) === 0 ? (
                      <button
                        onClick={() => addItem({
                          id: item.id,
                          name: item.name,
                          tamilName: item.tamilName,
                          price: item.price,
                          image: item.image,
                          isVeg: item.isVeg,
                        })}
                        className="w-full py-2 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-sm font-bold transition-all flex items-center justify-center gap-1 md:gap-2 bg-[var(--color-brand-beige)] text-[var(--color-brand-charcoal)] hover:bg-[var(--color-brand-charcoal)] hover:text-white shadow-sm"
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4" /> Add
                      </button>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="w-full flex items-center justify-between bg-[var(--color-brand-orange)] rounded-lg md:rounded-xl overflow-hidden shadow-md"
                      >
                        <button
                          onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}
                          className="px-2 md:px-4 py-2 md:py-3 text-white hover:bg-black/10 transition-colors"
                        >
                          <Minus className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                        <span className="text-white font-bold text-xs md:text-base">{getItemQuantity(item.id)}</span>
                        <button
                          onClick={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)}
                          className="px-2 md:px-4 py-2 md:py-3 text-white hover:bg-black/10 transition-colors"
                        >
                          <Plus className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredMenu.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[var(--color-brand-beige)]">
            <p className="text-[var(--color-brand-charcoal)]/40 font-medium">No items available for this selection at the moment.</p>
          </div>
        )}
      </div>

      {/* Floating Cart Button - Removed for Mobile to avoid duplication with Bottom Nav, kept for Desktop if needed */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={openCart}
            className="hidden lg:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-[900] bg-[var(--color-brand-charcoal)] hover:bg-[var(--color-brand-orange)] text-white px-8 py-5 rounded-2xl shadow-2xl items-center gap-6 transition-colors duration-300 min-w-[320px]"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--color-brand-orange)] rounded-full text-[10px] font-black flex items-center justify-center border-2 border-[var(--color-brand-charcoal)]">
                {totalItems}
              </span>
            </div>
            <div className="flex flex-col flex-1 text-left">
              <span className="font-bold text-sm leading-tight">{totalItems} {totalItems === 1 ? "Item" : "Items"}</span>
              <span className="text-[10px] text-white/60 uppercase tracking-widest">Ready to order</span>
            </div>
            <span className="font-black text-xl">₹{totalPrice}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}

