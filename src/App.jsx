import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Heart, Sparkles, Menu, X, ShoppingBag, Store, ArrowRight, Apple, Send, Zap, Flame, Clock } from 'lucide-react';

// --- PREMIUM COMPONENTS ---
const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="mb-6 w-80 bg-white rounded-[2.5rem] shadow-2xl border border-sage-100 overflow-hidden flex flex-col h-[450px]">
            <div className="bg-[#94a37e] p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3"><Apple size={20} fill="white" /> <span className="font-extrabold tracking-tight">Apple AI</span></div>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-grow p-6 bg-[#fffaf0]/50 space-y-4">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-sage-50 text-sm font-medium text-slate-600 soft-shadow">Hi love! I'm Apple. What are our fitness goals today? ✨</div>
            </div>
            <div className="p-6 bg-white border-t border-sage-50 flex gap-2">
              <input className="flex-grow bg-slate-50 p-3 rounded-xl text-sm outline-none font-medium" placeholder="Ask anything..." />
              <button className="bg-[#94a37e] text-white p-3 rounded-xl hover:opacity-80 transition-opacity"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)} className="w-20 h-20 bg-[#94a37e] rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white">
        <Apple size={36} fill="white" className={!isOpen ? "floating" : ""} />
      </motion.button>
    </div>
  );
};

const HomePage = () => (
  <div className="px-6">
    {/* Hero Section */}
    <section className="max-w-7xl mx-auto pt-20 pb-32 flex flex-col items-center text-center">
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-2 rounded-full bg-pink-100 text-pink-500 text-xs font-black uppercase tracking-[0.2em] mb-8">
        Welcome to the future of food
      </motion.span>
      <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-7xl md:text-[10rem] font-editorial leading-[0.85] text-slate-800 mb-12 italic">
        Beautifully <br/><span className="text-[#94a37e]">Nourished.</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="max-w-xl text-xl text-slate-400 font-medium leading-relaxed mb-12">
        A playful, premium AI experience that crafts your meals based on your vibe, your body, and your aesthetic.
      </motion.p>
      <Link to="/generator" className="bg-[#94a37e] text-white px-12 py-6 rounded-full font-black text-xl shadow-2xl shadow-sage-200 hover:scale-105 transition-transform active:scale-95">
        Plan Your Week — Free
      </Link>

      {/* Floating Cards Display */}
      <div className="mt-32 grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="bg-white p-10 rounded-[3rem] soft-shadow border border-sage-50 floating">
          <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6"><Heart className="text-pink-400 fill-pink-400" /></div>
          <h3 className="text-2xl font-black text-slate-800 mb-4">Body Love</h3>
          <p className="text-slate-400 font-medium">Automatic calorie deficit & macro calculations for your specific goals.</p>
        </div>
        <div className="bg-[#94a37e] p-10 rounded-[3rem] shadow-2xl text-white mt-12 md:mt-24">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6"><Zap className="text-yellow-300 fill-yellow-300" /></div>
          <h3 className="text-2xl font-black mb-4">Workout Sync</h3>
          <p className="opacity-80 font-medium">Meals that adapt to your training cycle. Bulk, cut, or perform.</p>
        </div>
        <div className="bg-white p-10 rounded-[3rem] soft-shadow border border-sage-50 floating" style={{ animationDelay: '1s' }}>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6"><ShoppingBag className="text-blue-400" /></div>
          <h3 className="text-2xl font-black text-slate-800 mb-4">Smart List</h3>
          <p className="text-slate-400 font-medium">Ingredients auto-grouped by grocery aisle to save you time.</p>
        </div>
      </div>
    </section>
  </div>
);

const GeneratorPage = () => {
  const [items, setItems] = useState([]);
  const [val, setVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(null);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setRes({ title: "Sage & Lemon Quinoa Power Bowl", cals: 420, time: "12m", goal: "Muscle Recovery" });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <h2 className="text-6xl font-editorial italic text-slate-800">What's in your <br/> <span className="text-[#94a37e]">Kitchen?</span></h2>
          <div className="relative">
            <input value={val} onChange={(e) => setVal(e.target.value)} className="w-full bg-white p-6 rounded-3xl border-2 border-slate-100 outline-none focus:border-[#94a37e] transition-all font-bold soft-shadow" placeholder="Add ingredients..." />
            <button onClick={() => {if(val) setItems([...items, val]); setVal('')}} className="absolute right-3 top-3 bg-[#94a37e] text-white p-3 rounded-2xl">+</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {items.map(i => <span key={i} className="px-5 py-2 bg-white rounded-full text-xs font-black uppercase tracking-widest border border-slate-100 soft-shadow">{i}</span>)}
          </div>
          <button onClick={generate} disabled={loading} className="w-full bg-[#94a37e] text-white py-6 rounded-full font-black text-xl shadow-xl hover:opacity-90 transition-all">
            {loading ? "Mixing Flavors..." : "Generate Magic ✨"}
          </button>
        </div>

        <div className="relative">
          <AnimatePresence>
            {res ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[4rem] p-12 soft-shadow border border-sage-50">
                <div className="flex justify-between items-start mb-10">
                  <div className="px-4 py-1.5 bg-yellow-100 text-yellow-600 rounded-full text-[10px] font-black uppercase tracking-widest">{res.goal}</div>
                  <div className="flex gap-4 text-slate-300 font-bold text-sm">
                    <span className="flex items-center gap-1"><Clock size={14}/> {res.time}</span>
                    <span className="flex items-center gap-1"><Flame size={14}/> {res.cals}</span>
                  </div>
                </div>
                <h3 className="text-4xl font-editorial italic text-slate-800 mb-6">{res.title}</h3>
                <p className="text-slate-400 font-medium mb-10 leading-relaxed">A nutrient-dense blend of your ingredients, balanced for peak athletic performance and aesthetic meal-prep.</p>
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-3">View Full Steps <ArrowRight size={18}/></button>
              </motion.div>
            ) : (
              <div className="h-[500px] border-4 border-dashed border-slate-100 rounded-[4rem] flex items-center justify-center text-slate-200">
                <Sparkles size={80} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- APP WRAPPER ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fffaf0] text-slate-800">
        <nav className="glass sticky top-6 z-[90] mx-auto mt-6 max-w-4xl h-20 rounded-full flex justify-between items-center px-10 soft-shadow">
          <Link to="/" className="flex items-center gap-2 font-black text-2xl text-[#4a5d4e]">
            <ChefHat className="text-[#94a37e]" /> MealMuse
          </Link>
          <div className="hidden md:flex gap-10 font-black text-[10px] uppercase tracking-[0.2em] text-slate-500">
            <Link to="/generator" className="hover:text-[#94a37e] transition-colors">Generator</Link>
            <Link to="/shop" className="hover:text-[#94a37e] transition-colors">Guides</Link>
            <Link to="/saved" className="hover:text-[#94a37e] transition-colors">Cookbook</Link>
          </div>
          <Link to="/login" className="bg-[#94a37e] text-white px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Sign In</Link>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/generator" element={<GeneratorPage />} />
            <Route path="/shop" element={<div className="text-center py-20 font-editorial text-4xl">Digital Store Coming Soon</div>} />
            <Route path="/saved" element={<div className="text-center py-20 font-editorial text-4xl">Your Cookbook</div>} />
            <Route path="/login" element={<div className="text-center py-20 font-editorial text-4xl">Member Access</div>} />
          </Routes>
        </main>
        
        <AIChatAssistant />
      </div>
    </Router>
  );
}

export default App;
