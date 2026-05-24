import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, Heart, Sparkles, X, ShoppingBag, Store, ArrowRight, Apple, Send, 
  Zap, Flame, Clock, Bookmark, ShoppingCart, Star, Search, Filter, 
  Calendar, Trash2, MapPin, DollarSign, LayoutGrid, Coffee, Smile, ChevronRight
} from 'lucide-react';

// --- DATA: 8 PREMIUM VIRAL RECIPES ---
const VIRAL_RECIPES = [
  { id: 1, title: "Lavender Glow Smoothie", cals: 210, cost: "$3.50", mood: "Healthy", tags: ["Vegan", "Quick"], protein: "8g", carbs: "32g", fat: "2g", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Post-Workout Quinoa", cals: 450, cost: "$8.20", mood: "Healthy", tags: ["High Protein", "Bulk"], protein: "28g", carbs: "55g", fat: "12g", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Viral Cloud Eggs", cals: 180, cost: "$2.10", mood: "Sweet", tags: ["Vegetarian", "TikTok"], protein: "14g", carbs: "4g", fat: "9g", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Miso Glazed Salmon", cals: 520, cost: "$14.50", mood: "Comfort", tags: ["Halal", "Gourmet"], protein: "34g", carbs: "10g", fat: "22g", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Budget Garlic Pasta", cals: 380, cost: "$1.80", mood: "Comfort", tags: ["Budget", "Quick"], protein: "12g", carbs: "62g", fat: "14g", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Jerk Chicken Bowl", cals: 550, cost: "$5.40", mood: "Cozy", tags: ["Caribbean", "Budget"], protein: "42g", carbs: "48g", fat: "18g", img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800" },
  { id: 7, title: "Cheesecake Oats", cals: 320, cost: "$2.90", mood: "Sweet", tags: ["Sweet", "Quick"], protein: "18g", carbs: "42g", fat: "8g", img: "https://images.unsplash.com/photo-1517673132405-a56a62b18977?auto=format&fit=crop&q=80&w=800" },
  { id: 8, title: "Tomato Soup Combo", cals: 480, cost: "$4.10", mood: "Cozy", tags: ["Cozy", "Comfort"], protein: "16g", carbs: "52g", fat: "24g", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800" },
];

// --- COMPONENT: PREMIUM APPLE ASSISTANT ---
const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', text: "Hi love! I'm your AI buddy. What should we call me?" }]);
  const [input, setInput] = useState('');
  const [name, setName] = useState(localStorage.getItem('appleName') || '');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    
    if (!name) {
      setName(input);
      localStorage.setItem('appleName', input);
      setTimeout(() => setMessages([...newMessages, { role: 'assistant', text: `I love it! I am ${input}. How can I help with your fitness goals today?` }]), 600);
    } else {
      setTimeout(() => setMessages([...newMessages, { role: 'assistant', text: "That sounds like a great plan. Based on your goals, I recommend a high-protein intake for recovery. Want a recipe?" }]), 800);
    }
    setInput('');
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="mb-6 w-96 bg-white rounded-[35px] shadow-luxury border border-borderSep overflow-hidden flex flex-col h-[500px]">
            <div className="bg-lavender p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4"><Apple size={24} fill="white" /> <span className="font-editorial italic text-xl">{name || 'Apple'}</span></div>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-grow p-6 bg-cream/30 space-y-4 overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium ${m.role === 'user' ? 'bg-dark text-white rounded-br-none' : 'bg-white text-dark rounded-bl-none shadow-sm'}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} className="p-6 bg-white border-t border-borderSep flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} className="flex-grow bg-cream p-4 rounded-2xl text-sm outline-none font-bold" placeholder="Message..." />
              <button className="bg-dark text-white p-4 rounded-2xl hover:bg-lavender transition-all"><Send size={18} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.05 }} onClick={() => setIsOpen(!isOpen)} className="w-24 h-24 bg-lavender rounded-full flex items-center justify-center text-white shadow-float border-[6px] border-white">
        {isOpen ? <X size={32} /> : <Apple size={44} fill="white" className="floating" />}
      </motion.button>
    </div>
  );
};

// --- PAGE: HOME (LUXURY EDITORIAL) ---
const HomePage = () => (
  <div className="max-w-[1400px] mx-auto px-10">
    <section className="pt-24 pb-40 grid lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-12">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 py-2 rounded-full bg-blush text-dark text-[10px] font-black uppercase tracking-[0.4em]">Personalized Aesthetic Nutrition</motion.span>
        <h1 className="text-7xl md:text-[8rem] font-editorial italic leading-[0.85] tracking-tighter text-dark">Beautifully <br/><span className="text-lavender">Fed.</span></h1>
        <p className="text-xl text-slateText font-medium max-w-lg leading-relaxed">A playful, premium AI experience that crafts your meals based on your body goals and your vibe.</p>
        <div className="flex gap-6">
          <Link to="/studio" className="bg-dark text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-lavender transition-all shadow-luxury">Start Building</Link>
          <button className="bg-white text-dark px-12 py-6 rounded-full font-bold text-lg border border-borderSep hover:border-lavender transition-all">Watch Demo</button>
        </div>
      </div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=1200" className="rounded-[60px] shadow-float w-full h-[700px] object-cover" alt="Luxury Food" />
        <div className="absolute top-10 -left-10 bg-white p-8 rounded-[40px] shadow-luxury floating"><Flame className="text-lavender mb-2"/> <span className="font-black text-2xl">210 kcal</span><p className="text-[10px] font-bold text-slateText uppercase">Optimal Deficit</p></div>
        <div className="absolute bottom-20 -right-10 bg-matcha p-8 rounded-[40px] shadow-luxury floating" style={{animationDelay: '1s'}}><Smile className="text-dark mb-2"/> <span className="font-black text-2xl">Vegan</span><p className="text-[10px] font-bold text-dark uppercase">Certified Clean</p></div>
      </div>
    </section>

    {/* Trending Carousel */}
    <section className="pb-40">
      <div className="flex justify-between items-end mb-16 px-4">
        <h2 className="text-5xl font-editorial italic">Trending <span className="text-lavender">Now.</span></h2>
        <Link to="/library" className="text-xs font-black uppercase tracking-widest text-lavender flex items-center gap-2">View All <ChevronRight size={14}/></Link>
      </div>
      <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-10">
        {VIRAL_RECIPES.slice(0,4).map(r => (
          <div key={r.id} className="min-w-[350px] bg-white rounded-[40px] overflow-hidden shadow-luxury border border-borderSep group cursor-pointer">
            <div className="h-64 overflow-hidden relative">
              <img src={r.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={r.title} />
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest">{r.tags[0]}</div>
            </div>
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-bold leading-tight">{r.title}</h3>
              <div className="flex justify-between items-center text-xs font-bold text-slateText">
                <span>{r.cals} kcal • {r.cost}</span>
                <Heart size={18} className="text-blush hover:fill-blush transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// --- PAGE: KITCHEN STUDIO (INTERACTIVE BUILDER) ---
const KitchenStudio = () => {
  const [ingredients, setIngredients] = useState([]);
  const [budget, setBudget] = useState(40);
  const [store, setStore] = useState('Whole Foods');
  const [val, setVal] = useState('');
  
  const totalCals = ingredients.length * 125;
  const totalCost = ingredients.length * 2.15;

  return (
    <div className="max-w-[1300px] mx-auto px-10 py-24 grid lg:grid-cols-12 gap-20">
      <div className="lg:col-span-5 space-y-12">
        <h2 className="text-7xl font-editorial italic leading-none">The <span className="text-lavender">Studio.</span></h2>
        
        <div className="bg-white p-10 rounded-[45px] shadow-luxury border border-borderSep space-y-10">
          <div>
            <div className="flex justify-between mb-4 font-ui font-black text-[10px] uppercase tracking-widest text-slateText">
              <span>Weekly Budget</span>
              <span className="text-lavender">${budget}</span>
            </div>
            <input type="range" min="10" max="200" value={budget} onChange={e => setBudget(e.target.value)} className="w-full accent-lavender h-1" />
          </div>

          <div className="space-y-4">
            <label className="font-ui font-black text-[10px] uppercase tracking-widest text-slateText ml-2">📍 Select Store</label>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {['Whole Foods', 'Walmart', 'Trader Joes', 'Kroger'].map(s => (
                <button key={s} onClick={() => setStore(s)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${store === s ? 'bg-dark text-white border-dark' : 'bg-cream text-slateText border-borderSep'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="relative">
            <input value={val} onChange={e => setVal(e.target.value)} className="w-full bg-cream p-6 rounded-3xl outline-none font-bold placeholder:text-slateText/30" placeholder="Add ingredient..." />
            <button onClick={() => {if(val) setIngredients([...ingredients, val]); setVal('')}} className="absolute right-3 top-3 bg-dark text-white p-3 rounded-2xl hover:bg-lavender transition-all">+</button>
          </div>

          <div className="flex flex-wrap gap-2">
            {ingredients.map((i, idx) => (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} key={idx} className="px-5 py-2 bg-white border border-borderSep rounded-full text-[10px] font-black uppercase text-dark shadow-sm flex items-center gap-2">
                {i} <X size={12} className="cursor-pointer" onClick={() => setIngredients(ingredients.filter((_,j) => j !== idx))} />
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="bg-dark text-white p-16 rounded-[60px] shadow-float h-full relative overflow-hidden flex flex-col justify-between">
           <div className="absolute top-0 right-0 p-10 opacity-10"><ChefHat size={300} /></div>
           <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-lavender mb-10 block">Real-time Analysis</span>
              <div className="grid grid-cols-2 gap-10 mb-20">
                <div><p className="text-4xl font-editorial italic mb-2">{totalCals}</p><p className="text-[10px] font-black uppercase opacity-40">Est. Calories</p></div>
                <div><p className="text-4xl font-editorial italic mb-2">${totalCost.toFixed(2)}</p><p className="text-[10px] font-black uppercase opacity-40">Est. Cost at {store}</p></div>
              </div>
              <h3 className="text-5xl font-editorial leading-tight italic max-w-sm">Ready to generate your custom plan?</h3>
           </div>
           <button className="relative z-10 w-full py-8 bg-lavender text-dark rounded-[30px] font-black text-2xl shadow-xl hover:scale-[1.02] transition-transform">Run AI Recipe Engine ✨</button>
        </div>
      </div>
    </div>
  );
};

const Library = () => (
  <div className="max-w-[1300px] mx-auto px-10 py-24">
    <div className="flex justify-between items-end mb-24">
      <h2 className="text-8xl font-editorial italic leading-none">The <span className="text-lavender">Library.</span></h2>
      <div className="bg-blush px-8 py-4 rounded-3xl font-black text-sm shadow-luxury">8 Curated Starters</div>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {VIRAL_RECIPES.map(r => (
        <div key={r.id} className="bg-white rounded-[50px] overflow-hidden shadow-luxury border border-borderSep group hover:shadow-float transition-all">
          <img src={r.img} className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-700" alt={r.title} />
          <div className="p-10 space-y-6">
            <h3 className="text-3xl font-bold leading-tight">{r.title}</h3>
            <div className="flex gap-3">
              {r.tags.map(t => <span key={t} className="text-[9px] font-black uppercase bg-cream px-3 py-1 rounded-full">{t}</span>)}
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-borderSep">
              <span className="text-xs font-bold text-slateText uppercase tracking-widest">{r.cals} kcal • {r.cost}</span>
              <button className="bg-dark text-white p-4 rounded-2xl"><ArrowRight size={20}/></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- APP WRAPPER (LAYOUT) ---
function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Premium Floating Nav */}
      <nav className="glass sticky top-8 z-[90] mx-auto max-w-[950px] h-24 rounded-full flex justify-between items-center px-12 shadow-luxury border border-borderSep mt-6">
        <Link to="/" className="flex items-center gap-4 font-black text-2xl tracking-tighter">
          <div className="w-12 h-12 bg-lavender rounded-[20px] flex items-center justify-center shadow-lg"><ChefHat size={26} color="white" /></div>
          MealMuse
        </Link>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slateText">
          <NavLink to="/" className={({isActive}) => isActive ? "text-lavender" : "hover:text-lavender"}>Explore</NavLink>
          <NavLink to="/studio" className={({isActive}) => isActive ? "text-lavender" : "hover:text-lavender"}>Studio</NavLink>
          <NavLink to="/library" className={({isActive}) => isActive ? "text-lavender" : "hover:text-lavender"}>Library</NavLink>
          <NavLink to="/boutique" className={({isActive}) => isActive ? "text-lavender" : "hover:text-lavender"}>Boutique</NavLink>
        </div>
        <Link to="/premium" className="bg-dark text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-lavender transition-all">Go Premium</Link>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/studio" element={<KitchenStudio />} />
          <Route path="/library" element={<Library />} />
          <Route path="/boutique" element={<div className="max-w-[1200px] mx-auto px-6 py-40 text-8xl font-editorial italic">The <br/><span className="text-lavender">Boutique.</span></div>} />
          <Route path="/premium" element={<div className="max-w-[1200px] mx-auto px-6 py-40 text-center text-8xl font-editorial italic">The <br/><span className="text-blush">Elite Club.</span></div>} />
        </Routes>
      </main>
      
      <AIChatAssistant />
      
      {/* Luxury Footer */}
      <footer className="bg-white py-32 mt-40 border-t border-borderSep">
         <div className="max-w-[1300px] mx-auto px-10 grid md:grid-cols-4 gap-24">
            <div className="col-span-2 space-y-8">
              <h3 className="text-4xl font-editorial italic">MealMuse.</h3>
              <p className="text-slateText text-xl font-medium leading-relaxed max-w-sm">The digital studio for the modern body. Designed for the aesthetic, powered by intelligence.</p>
            </div>
            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-lavender">Navigation</h4>
               <div className="flex flex-col gap-3 font-bold text-dark text-sm">
                 <Link to="/studio">The Studio</Link>
                 <Link to="/library">The Library</Link>
                 <Link to="/premium">Join Premium</Link>
               </div>
            </div>
            <div className="space-y-6 text-right">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-lavender">Social</h4>
               <p className="font-bold">TikTok • Instagram</p>
               <p className="text-[10px] font-black uppercase opacity-20 tracking-tighter">© 2024 MealMuse Studio</p>
            </div>
         </div>
      </footer>
    </div>
  );
}

export default App;
