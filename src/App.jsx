import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, Heart, Sparkles, X, ShoppingBag, Store, ArrowRight, Apple, Send, 
  Zap, Flame, Clock, Bookmark, ShoppingCart, Star, MapPin, Smile, ChevronRight, Filter
} from 'lucide-react';

// --- THE RECIPES (ALL 8!) ---
const RECIPES = [
  { id: 1, title: "Lavender Glow Smoothie", cals: 210, cost: "$3.50", tags: ["Vegan", "Quick"], img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800" },
  { id: 2, title: "Post-Workout Quinoa Bowl", cals: 450, cost: "$8.20", tags: ["High Protein", "Bulk"], img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" },
  { id: 3, title: "Viral Cloud Eggs", cals: 180, cost: "$2.10", tags: ["Vegetarian", "TikTok"], img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800" },
  { id: 4, title: "Miso Glazed Salmon", cals: 520, cost: "$14.50", tags: ["Halal", "Gourmet"], img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800" },
  { id: 5, title: "Budget Garlic Pasta", cals: 380, cost: "$1.80", tags: ["Budget", "Quick"], img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800" },
  { id: 6, title: "Jerk Chicken Bowl", cals: 550, cost: "$5.40", tags: ["Caribbean", "Budget"], img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800" },
  { id: 7, title: "Cheesecake Oats", cals: 320, cost: "$2.90", tags: ["Sweet", "Quick"], img: "https://images.unsplash.com/photo-1517673132405-a56a62b18977?w=800" },
  { id: 8, title: "Tomato Soup & Grilled Cheese", cals: 480, cost: "$4.10", tags: ["Cozy", "Comfort"], img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800" },
];

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: 'ai', text: "Hi love! I'm your AI buddy. What should we call me?" }]);
  const [input, setInput] = useState('');
  const [name, setName] = useState(localStorage.getItem('appleName') || '');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsgs = [...msgs, { role: 'user', text: input }];
    setMsgs(newMsgs);
    setInput('');
    setTimeout(() => {
      let reply = "Based on your fitness goals, focus on high-protein intake today! ✨";
      if (!name) { setName(input); localStorage.setItem('appleName', input); reply = `I love it! I am ${input}. Ready to glow?`; }
      setMsgs([...newMsgs, { role: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 w-80 bg-white rounded-[35px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[450px]">
          <div className="bg-[#B8A3FF] p-6 text-white flex justify-between items-center font-bold">
            <span>{name || 'Apple'} AI</span>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-50">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-3xl text-sm font-medium ${m.role === 'user' ? 'bg-dark text-white' : 'bg-white text-dark shadow-sm'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} className="flex-grow p-3 bg-slate-100 rounded-xl outline-none text-sm font-bold" placeholder="Message..." />
            <button className="bg-dark text-white p-3 rounded-xl"><Send size={18} /></button>
          </form>
        </motion.div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-20 h-20 bg-[#B8A3FF] rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
        {isOpen ? <X size={32} /> : <Apple size={36} fill="white" />}
      </button>
    </div>
  );
};

const HomePage = () => (
  <div className="max-w-[1400px] mx-auto px-10">
    <section className="pt-24 pb-40 text-center">
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 py-2 rounded-full bg-blush text-dark text-[10px] font-black uppercase tracking-[0.4em]">Premium AI Nutrition</motion.span>
      <h1 className="text-8xl md:text-[10rem] font-editorial italic leading-none text-dark my-10">Beautifully <br/><span className="text-lavender">Fed.</span></h1>
      <p className="text-xl text-slate-400 max-w-xl mx-auto mb-12 font-medium">A aesthetic AI experience that plans your life, saves you money, and hits your body goals.</p>
      <Link to="/studio" className="bg-dark text-white px-14 py-6 rounded-full font-bold text-xl shadow-xl hover:bg-lavender transition-all">Start Building</Link>
      
      <div className="mt-40 grid md:grid-cols-4 gap-8 text-left">
        {RECIPES.slice(0,4).map(r => (
          <div key={r.id} className="bg-white rounded-[40px] overflow-hidden shadow-luxury border border-slate-100 hover:shadow-float transition-all cursor-pointer group">
            <img src={r.img} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="p-8">
              <h3 className="font-bold text-xl mb-2">{r.title}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase">{r.cals} kcal • {r.cost}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const KitchenStudio = () => {
  const [ingredients, setIngredients] = useState([]);
  const [val, setVal] = useState('');
  const [budget, setBudget] = useState(50);
  const [allergies, setAllergies] = useState([]);
  const [mood, setMood] = useState('Healthy');

  return (
    <div className="max-w-[1300px] mx-auto px-10 py-24 grid lg:grid-cols-12 gap-20">
      <div className="lg:col-span-5 space-y-12">
        <h2 className="text-7xl font-editorial italic leading-none">The <span className="text-lavender">Studio.</span></h2>
        <div className="bg-white p-10 rounded-[45px] shadow-luxury border border-slate-100 space-y-10">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Mood</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['Healthy', 'Comfort', 'Sweet', 'Quick'].map(m => (
                <button key={m} onClick={() => setMood(m)} className={`px-5 py-2 rounded-full text-[10px] font-black border transition-all ${mood === m ? 'bg-dark text-white border-dark' : 'bg-white text-slate-400 border-slate-100'}`}>{m}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Weekly Budget: ${budget}</label>
            <input type="range" min="10" max="300" value={budget} onChange={e => setBudget(e.target.value)} className="w-full accent-lavender" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Allergies</label>
            <div className="flex flex-wrap gap-2">
              {['Nuts', 'Dairy', 'Gluten', 'Eggs'].map(a => (
                <button key={a} onClick={() => setAllergies(prev => prev.includes(a) ? prev.filter(x => x!==a) : [...prev, a])} className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${allergies.includes(a) ? 'bg-blush border-blush text-dark' : 'bg-white border-slate-100 text-slate-400'}`}>{a}</button>
              ))}
            </div>
          </div>
          <div className="relative">
            <input value={val} onChange={e => setVal(e.target.value)} className="w-full bg-cream p-6 rounded-3xl outline-none font-bold" placeholder="Add ingredient..." />
            <button onClick={() => {if(val) setIngredients([...ingredients, val]); setVal('')}} className="absolute right-3 top-3 bg-dark text-white p-3 rounded-2xl">+</button>
          </div>
          <button className="w-full py-6 bg-dark text-white rounded-full font-black text-xl shadow-xl hover:bg-lavender transition-all">Generate AI Plan ✨</button>
        </div>
      </div>
      <div className="lg:col-span-7 bg-dark rounded-[60px] p-16 text-white flex flex-col justify-center items-center text-center space-y-8">
        <Sparkles size={80} className="text-lavender opacity-20" />
        <h3 className="text-5xl font-editorial italic">Ready to analyze.</h3>
        <p className="text-xl opacity-40 max-w-sm font-medium">Input your budget and mood to see the AI magic.</p>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <div className="min-h-screen bg-cream">
      <nav className="glass sticky top-8 z-[90] mx-auto max-w-[850px] h-24 rounded-full flex justify-between items-center px-12 shadow-luxury border border-slate-100 mt-6">
        <Link to="/" className="font-black text-2xl tracking-tighter">MealMuse</Link>
        <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link to="/studio">Studio</Link>
          <Link to="/library">Library</Link>
          <Link to="/boutique">Boutique</Link>
        </div>
        <Link to="/login" className="bg-dark text-white px-8 py-3 rounded-full text-[10px] font-black hover:bg-lavender transition-all">Sign In</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studio" element={<KitchenStudio />} />
        <Route path="/library" element={<div className="max-w-[1300px] mx-auto px-10 py-24"><h2 className="text-8xl font-editorial italic mb-20">The <span className="text-lavender">Library.</span></h2><div className="grid md:grid-cols-3 gap-8">{RECIPES.map(r => (<div key={r.id} className="bg-white rounded-[40px] overflow-hidden shadow-luxury border border-slate-100"><img src={r.img} className="h-64 w-full object-cover" /><div className="p-10"><h3 className="text-3xl font-bold mb-4">{r.title}</h3><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{r.cals} kcal • {r.cost}</p></div></div>))}</div></div>} />
        <Route path="/boutique" element={<div className="text-center py-40 text-8xl font-editorial italic">The <span className="text-lavender">Boutique.</span></div>} />
      </Routes>
      <AIChatAssistant />
    </div>
  </Router>
);

export default App;
