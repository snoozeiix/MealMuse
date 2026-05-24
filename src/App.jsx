import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Heart, Sparkles, Menu, X, ShoppingBag, Store, User, Apple, Send } from 'lucide-react';

// --- COMPONENTS ---
const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [assistantName, setAssistantName] = useState('Apple');
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hi! I am Apple. What are we cooking today?' }]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }, { role: 'assistant', text: 'Great question! Focus on high-protein foods for that.' }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-orange-50 overflow-hidden flex flex-col h-[400px]">
          <div className="bg-[#94a37e] p-4 text-white flex justify-between">
            <div className="flex items-center gap-2"><Apple size={18} fill="white" /> <span className="font-bold">{assistantName}</span></div>
            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#94a37e] text-white' : 'bg-white text-slate-600 border border-slate-100'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-grow text-sm bg-slate-50 p-2 rounded-xl outline-none" placeholder="Ask anything..." />
            <button className="bg-[#94a37e] text-white p-2 rounded-xl"><Send size={16} /></button>
          </form>
        </motion.div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-[#94a37e] rounded-full flex items-center justify-center text-white shadow-xl"><Apple size={32} fill="white" /></button>
    </div>
  );
};

// --- PAGES ---
const HomePage = () => (
  <div className="text-center py-20 px-4">
    <h1 className="text-6xl md:text-8xl font-black text-slate-800 mb-8">Your Body, <br/><span className="text-[#94a37e]">Beautifully</span> Fed.</h1>
    <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">Aesthetic AI meal planning tailored to your workout and your vibe.</p>
    <Link to="/generator" className="bg-[#94a37e] text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-lg hover:scale-105 transition-transform inline-block">Start Planning</Link>
  </div>
);

const GeneratorPage = () => {
  const [ing, setIng] = useState([]);
  const [val, setVal] = useState('');
  const [res, setRes] = useState(null);

  const generate = () => {
    setRes({ title: "Zesty Power Bowl", cals: 450, time: "15m", items: ["Chicken", "Quinoa", "Spinach"] });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-orange-50 mb-8">
        <h2 className="text-2xl font-black mb-6">What's in your fridge?</h2>
        <div className="flex gap-2 mb-6">
          <input value={val} onChange={(e) => setVal(e.target.value)} className="flex-grow bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl outline-none" placeholder="Add ingredients..." />
          <button onClick={() => { setIng([...ing, val]); setVal(''); }} className="bg-[#94a37e] text-white px-6 rounded-2xl font-bold">+</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">{ing.map(i => <span key={i} className="bg-slate-100 px-4 py-2 rounded-full text-sm font-bold">{i}</span>)}</div>
        <button onClick={generate} className="w-full bg-[#94a37e] text-white py-5 rounded-[2rem] font-black text-xl shadow-md">Generate Recipe ✨</button>
      </div>
      {res && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3rem] border border-orange-50 overflow-hidden shadow-2xl">
          <div className="bg-[#94a37e] p-8 text-white"><h3 className="text-3xl font-black">{res.title}</h3><p className="opacity-80 font-bold">{res.time} • {res.cals} kcal</p></div>
          <div className="p-8"><h4 className="font-black text-slate-400 uppercase text-xs tracking-widest mb-4">Ingredients</h4><div className="flex flex-wrap gap-2">{res.items.map(i => <span key={i} className="bg-slate-50 border px-4 py-2 rounded-xl text-sm font-bold">{i}</span>)}</div></div>
        </motion.div>
      )}
    </div>
  );
};

// --- APP WRAPPER ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fffaf0] text-slate-800">
        <nav className="flex justify-between items-center h-20 px-8 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 font-black text-2xl text-[#4a5d4e]"><div className="bg-[#94a37e] p-2 rounded-xl"><ChefHat color="white" /></div> MealMuse</Link>
          <div className="hidden md:flex gap-8 font-bold text-slate-600 text-sm">
            <Link to="/generator">Generator</Link>
            <Link to="/shopping">Shopping</Link>
            <Link to="/saved">Cookbook</Link>
          </div>
          <Link to="/login" className="bg-[#94a37e] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md">Sign In</Link>
        </nav>
        <main><Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/shopping" element={<div>Coming Soon</div>} />
          <Route path="/saved" element={<div>Coming Soon</div>} />
          <Route path="/login" element={<div>Sign In Page</div>} />
        </Routes></main>
        <AIChatAssistant />
      </div>
    </Router>
  );
}

export default App;
