import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, Heart, Sparkles, X, ShoppingBag, Store, ArrowRight, Apple, Send, 
  Zap, Flame, Clock, Bookmark, ShoppingCart, Star, Search, Filter, 
  Calendar, Trash2, MapPin, DollarSign, LayoutGrid, Coffee, Smile
} from 'lucide-react';

// --- DATA: 5 STARTER RECIPES ---
const STARTER_COOKBOOK = [
  { id: 1, title: "Lavender Glow Smoothie", cals: 210, cost: "$3.50", mood: "Healthy", tags: ["Vegan", "Quick"], protein: "8g", carbs: "32g", fat: "2g" },
  { id: 2, title: "Post-Workout Quinoa Bowl", cals: 450, cost: "$8.20", mood: "Healthy", tags: ["High Protein", "Bulk"], protein: "28g", carbs: "55g", fat: "12g" },
  { id: 3, title: "Viral Cloud Eggs", cals: 180, cost: "$2.10", mood: "Sweet", tags: ["Vegetarian", "TikTok"], protein: "14g", carbs: "4g", fat: "9g" },
  { id: 4, title: "Miso Glazed Salmon", cals: 520, cost: "$14.50", mood: "Comfort", tags: ["Halal", "Gourmet"], protein: "34g", carbs: "10g", fat: "22g" },
  { id: 5, title: "Budget Garlic Pasta", cals: 380, cost: "$1.80", mood: "Comfort", tags: ["Budget", "Quick"], protein: "12g", carbs: "62g", fat: "14g" },
];

// --- COMPONENT: PREMIUM APPLE ASSISTANT ---
const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(localStorage.getItem('appleName') || 'Apple');
  const [isNaming, setIsNaming] = useState(!localStorage.getItem('appleName'));

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="mb-6 w-96 bg-white rounded-[35px] shadow-premium border border-slate-100 overflow-hidden flex flex-col h-[550px]">
            <div className="bg-lavender p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-xl"><Apple size={24} fill="white" /></div>
                <div><h3 className="font-bold leading-none">{name} AI</h3><span className="text-[10px] opacity-70 uppercase tracking-widest font-black">Your Nutritionist</span></div>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-grow p-8 bg-bgOffWhite/50 space-y-6 overflow-y-auto">
              <div className="bg-white p-5 rounded-[22px] rounded-bl-none shadow-sm text-sm font-medium text-slate-600 leading-relaxed">
                {isNaming ? "Hi! I'm your new AI buddy. What should we call me?" : `Hi love! Ready to hit those ${name}-approved goals today? ✨`}
              </div>
            </div>
            <div className="p-6 bg-white border-t border-slate-50">
              <div className="flex gap-3">
                <input 
                  className="flex-grow bg-bgOffWhite p-4 rounded-2xl text-sm outline-none font-semibold text-neutralDark" 
                  placeholder={isNaming ? "Name me..." : "Ask about calories, macros..."}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter' && isNaming) {
                      localStorage.setItem('appleName', e.target.value);
                      setName(e.target.value);
                      setIsNaming(false);
                    }
                  }}
                />
                <button className="bg-neutralDark text-white p-4 rounded-2xl hover:bg-lavender transition-all"><Send size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)} className="w-24 h-24 bg-lavender rounded-full flex items-center justify-center text-white shadow-float border-[6px] border-white">
        {isOpen ? <X size={32} /> : <Apple size={44} fill="white" className="floating" />}
      </motion.button>
    </div>
  );
};

// --- PAGE: HOME (LUXURY LANDING) ---
const HomePage = () => (
  <div className="max-w-[1200px] mx-auto px-6">
    <section className="pt-32 pb-48 flex flex-col items-center text-center">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-6 py-2 rounded-full bg-blush text-neutralDark text-[10px] font-black uppercase tracking-[0.3em] mb-12">
        Aesthetic Intelligence for Your Body
      </motion.div>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-8xl md:text-[10rem] font-extrabold leading-[0.85] tracking-tighter text-neutralDark mb-16">
        Eat for <br/> <span className="text-lavender">the vibe.</span>
      </motion.h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link to="/studio" className="bg-neutralDark text-white px-14 py-7 rounded-full font-bold text-xl hover:bg-lavender transition-all shadow-premium active:scale-95">
          Enter The Studio
        </Link>
        <Link to="/boutique" className="bg-white text-neutralDark px-14 py-7 rounded-full font-bold text-xl border border-slate-200 hover:border-lavender transition-all">
          Explore Boutique
        </Link>
      </div>

      <div className="mt-56 grid lg:grid-cols-12 gap-8 w-full text-left">
        <div className="lg:col-span-8 bg-white p-20 rounded-[50px] shadow-premium border border-slate-50 flex flex-col justify-between min-h-[550px]">
           <div className="w-20 h-20 bg-lavender/10 rounded-[25px] flex items-center justify-center mb-12 text-lavender font-black">AI</div>
           <div>
             <h3 className="text-6xl font-extrabold mb-8 tracking-tighter leading-none text-neutralDark">Real-time <br/> Nutri-Data.</h3>
             <p className="text-softGray text-xl font-medium leading-relaxed max-w-md">Connected to USDA & Spoonacular for surgical precision in calories, costs, and macros.</p>
           </div>
        </div>
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-blush p-14 rounded-[50px] shadow-premium min-h-[260px] flex flex-col justify-between floating">
                <Heart size={40} className="text-white fill-white" />
                <h4 className="text-3xl font-extrabold text-neutralDark leading-tight tracking-tight">Viral <br/> TikTok Prep.</h4>
            </div>
            <div className="bg-butter p-14 rounded-[50px] shadow-premium min-h-[260px] flex flex-col justify-between" style={{animationDelay: '1s'}}>
                <DollarSign size={40} className="text-neutralDark" />
                <h4 className="text-3xl font-extrabold text-neutralDark leading-tight tracking-tight">Budget <br/> Control.</h4>
            </div>
        </div>
      </div>
    </section>
  </div>
);

// --- PAGE: KITCHEN STUDIO (THE GENERATOR) ---
const KitchenStudio = () => {
  const [budget, setBudget] = useState(50);
  const [pantryMode, setPantryMode] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [val, setVal] = useState('');
  const [res, setRes] = useState(null);

  const generate = () => {
    setRes({
      title: "Sage-Lavender Power Bowl",
      cals: 410,
      protein: "24g",
      carbs: "45g",
      fat: "14g",
      cost: "$6.40",
      store: "Whole Foods (Est.)"
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        {/* Sidebar Controls */}
        <div className="lg:col-span-5 space-y-10 sticky top-32">
           <h2 className="text-6xl font-extrabold tracking-tighter leading-none text-neutralDark italic">The <br/><span className="text-lavender">Kitchen</span> Studio.</h2>
           
           <div className="space-y-6 bg-white p-10 rounded-[40px] shadow-premium border border-slate-50">
             <div>
               <div className="flex justify-between mb-4"><label className="text-[10px] font-black uppercase tracking-widest text-softGray">Weekly Budget</label><span className="text-lavender font-black text-sm">${budget}</span></div>
               <input type="range" min="10" max="200" value={budget} onChange={e => setBudget(e.target.value)} className="w-full accent-lavender" />
             </div>
             
             <div className="flex items-center justify-between p-4 bg-bgOffWhite rounded-2xl">
               <span className="text-sm font-bold text-neutralDark">Pantry-Only Mode</span>
               <button onClick={() => setPantryMode(!pantryMode)} className={`w-12 h-6 rounded-full transition-all ${pantryMode ? 'bg-lavender' : 'bg-slate-200'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-all m-1 ${pantryMode ? 'translate-x-6' : ''}`} />
               </button>
             </div>

             <div className="relative">
               <input value={val} onChange={e => setVal(e.target.value)} className="w-full p-6 rounded-2xl bg-bgOffWhite border-none outline-none font-bold placeholder:text-slate-300" placeholder="I have..." />
               <button onClick={() => {if(val) setIngredients([...ingredients, val]); setVal('')}} className="absolute right-2 top-2 bg-neutralDark text-white p-4 rounded-xl hover:bg-lavender transition-all">+</button>
             </div>

             <div className="flex flex-wrap gap-2">
               {ingredients.map(i => <span key={i} className="px-4 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase text-softGray shadow-sm">{i}</span>)}
             </div>

             <button onClick={generate} className="w-full py-6 bg-neutralDark text-white rounded-full font-black text-lg shadow-premium hover:bg-lavender transition-all active:scale-95">Generate Studio Recipe ✨</button>
           </div>
        </div>

        {/* Result Panel */}
        <div className="lg:col-span-7 min-h-[700px]">
           {res ? (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[50px] p-16 shadow-premium border border-slate-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5"><ChefHat size={200} /></div>
               <div className="relative z-10">
                 <div className="flex justify-between items-start mb-12">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-2 text-[10px] font-black bg-bgOffWhite px-5 py-2 rounded-full uppercase"><Flame size={14} className="text-lavender"/> {res.cals} cals</span>
                      <span className="flex items-center gap-2 text-[10px] font-black bg-bgOffWhite px-5 py-2 rounded-full uppercase"><MapPin size={14} className="text-blush"/> {res.store}</span>
                    </div>
                    <button className="p-5 bg-blush/30 text-neutralDark rounded-3xl hover:bg-blush transition-all"><Bookmark /></button>
                 </div>
                 <h3 className="text-6xl font-extrabold tracking-tighter mb-10 leading-none text-neutralDark">{res.title}</h3>
                 
                 <div className="grid grid-cols-3 gap-4 mb-12">
                   {[{l: 'Protein', v: res.protein}, {l: 'Carbs', v: res.carbs}, {l: 'Fat', v: res.fat}].map(m => (
                     <div key={m.l} className="bg-bgOffWhite p-6 rounded-[25px] text-center border border-white">
                        <span className="text-[10px] font-black uppercase text-slate-300 block mb-1">{m.l}</span>
                        <span className="text-xl font-extrabold text-neutralDark">{m.v}</span>
                     </div>
                   ))}
                 </div>

                 <div className="flex items-center justify-between p-8 bg-neutralDark rounded-[30px] text-white">
                   <div><span className="text-[10px] font-black uppercase opacity-50 block">Meal Cost</span><span className="text-3xl font-extrabold">{res.cost}</span></div>
                   <button className="bg-lavender text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:opacity-90 transition-all">Get Shopping List <ArrowRight size={20}/></button>
                 </div>
               </div>
             </motion.div>
           ) : (
             <div className="h-full rounded-[60px] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center p-32 text-center text-slate-200">
                <Sparkles size={80} className="mb-8 opacity-20" />
                <h4 className="text-3xl font-extrabold">Awaiting Analysis.</h4>
                <p className="text-xl font-medium max-w-xs">Input your pantry and budget to start the studio experience.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// --- PAGE: COOKBOOK (WITH 5 STARTERS) ---
const Cookbook = () => (
  <div className="max-w-[1200px] mx-auto px-6 py-24">
    <div className="flex justify-between items-end mb-24">
      <div>
        <h2 className="text-7xl font-extrabold tracking-tighter mb-4 text-neutralDark italic">The <span className="text-lavender">Library.</span></h2>
        <p className="text-softGray text-xl font-medium">Your curated personal nutrition collections.</p>
      </div>
      <div className="bg-lavender text-white px-8 py-4 rounded-3xl font-black shadow-float">5 Curated Starters</div>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {STARTER_COOKBOOK.map((r, i) => (
        <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }} className="group bg-white p-10 rounded-[45px] border border-slate-50 shadow-premium hover:shadow-float transition-all cursor-pointer">
           <div className="flex justify-between mb-8">
             <div className="flex gap-2">
               {r.tags.map(t => <span key={t} className="text-[9px] font-black uppercase bg-bgOffWhite px-3 py-1.5 rounded-full text-softGray">{t}</span>)}
             </div>
             <Heart size={18} className="text-blush" />
           </div>
           <h3 className="text-3xl font-extrabold text-neutralDark mb-6 leading-tight group-hover:text-lavender transition-colors">{r.title}</h3>
           <div className="flex justify-between items-center pt-8 border-t border-slate-50">
             <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">{r.cals} kcal • {r.cost}</div>
             <div className="w-12 h-12 bg-neutralDark text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><ArrowRight size={20}/></div>
           </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// --- APP WRAPPER (LAYOUT) ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bgOffWhite">
        {/* Premium Navigation */}
        <nav className="glass sticky top-8 z-[90] mx-auto max-w-[900px] h-20 rounded-full flex justify-between items-center px-10 shadow-premium">
          <Link to="/" className="flex items-center gap-3 font-extrabold text-2xl tracking-tighter text-neutralDark">
            <div className="w-12 h-12 bg-lavender rounded-[18px] flex items-center justify-center shadow-lg"><ChefHat size={24} color="white" /></div>
            MealMuse
          </Link>
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-softGray">
            <NavLink to="/studio" className={({isActive}) => isActive ? "text-lavender" : "hover:text-lavender transition-all"}>Studio</NavLink>
            <NavLink to="/library" className={({isActive}) => isActive ? "text-lavender" : "hover:text-lavender transition-all"}>Library</NavLink>
            <NavLink to="/boutique" className={({isActive}) => isActive ? "text-lavender" : "hover:text-lavender transition-all"}>Boutique</NavLink>
          </div>
          <Link to="/login" className="bg-neutralDark text-white px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-lavender active:scale-95 transition-all">Sign In</Link>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/studio" element={<KitchenStudio />} />
            <Route path="/library" element={<Cookbook />} />
            <Route path="/boutique" element={<div className="max-w-[1200px] mx-auto px-6 py-32 text-8xl font-extrabold italic text-neutralDark">The <br/><span className="text-lavender">Boutique.</span><p className="text-xl font-medium text-softGray mt-10 not-italic">Curated lifestyle essentials coming soon.</p></div>} />
            <Route path="/login" element={<div className="max-w-[1200px] mx-auto px-6 py-32 text-center text-8xl font-extrabold text-neutralDark">Join the <br/><span className="text-blush">Collective.</span></div>} />
          </Routes>
        </main>
        
        <AIChatAssistant />
        
        {/* Footer Editorial */}
        <footer className="bg-white py-24 mt-48 border-t border-slate-50">
           <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-20">
              <div className="col-span-2">
                <h3 className="text-3xl font-extrabold text-neutralDark mb-8">MealMuse.</h3>
                <p className="text-softGray text-lg font-medium leading-relaxed max-w-sm">The digital studio for the modern body. Powered by AI, designed for the aesthetic.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-lavender">Navigation</h4>
                 <div className="flex flex-col gap-2 font-bold text-neutralDark">
                   <Link to="/studio">The Studio</Link>
                   <Link to="/library">Library</Link>
                   <Link to="/boutique">Boutique</Link>
                 </div>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-lavender">Connect</h4>
                 <div className="flex flex-col gap-2 font-bold text-neutralDark">
                   <span>TikTok</span>
                   <span>Instagram</span>
                   <span>Privacy</span>
                 </div>
              </div>
           </div>
           <div className="text-center mt-32 text-[10px] font-black uppercase tracking-[0.5em] text-slate-200">MealMuse Premium Studio © 2024</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
