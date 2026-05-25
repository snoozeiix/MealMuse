import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Send, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hey! I'm Apple. Ready to optimize your kitchen?" }]);
  const [input, setInput] = useState('');
  const { subscription, user } = useUser();

  const handleSend = () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setTimeout(() => {
      let res = "I'm learning your tastes! Try asking about high-protein recipes or budget tips.";
      if (input.toLowerCase().includes('price')) {
        res = subscription === 'free' ? "Price comparison is a Plus feature! Upgrade to save 20% on groceries." : "Avocados are currently 20% off at Whole Foods!";
      }
      setMessages([...newMessages, { role: 'assistant', content: res }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-orange-50 flex flex-col overflow-hidden">
            <div className="bg-[#94a37e] p-6 text-white flex justify-between items-center font-black"><span>Apple AI</span><X onClick={() => setIsOpen(false)} className="cursor-pointer" /></div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((m, i) => <div key={i} className={`p-4 rounded-2xl text-sm font-bold ${m.role === 'user' ? 'bg-slate-900 text-white ml-auto' : 'bg-slate-100 text-slate-700'}`}>{m.content}</div>)}
            </div>
            <div className="p-6 border-t border-orange-50 flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} className="flex-1 bg-slate-50 border-none rounded-xl px-4 font-bold text-sm" placeholder="Ask the Muse..." />
              <button onClick={handleSend} className="bg-[#94a37e] p-3 rounded-xl text-white"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-[#94a37e] rounded-full flex items-center justify-center text-white shadow-2xl"><Apple size={30} /></button>
    </div>
  );
};
export default AIChatAssistant;
