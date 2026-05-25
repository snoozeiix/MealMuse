import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Heart, Sparkles, Menu, X, ShoppingBag, Store, Crown } from 'lucide-react';
import HomePage from './pages/HomePage';
import GeneratorPage from './pages/GeneratorPage';
import SavedRecipes from './pages/SavedRecipes';
import LoginPage from './pages/LoginPage';
import ShoppingPage from './pages/ShoppingPage';
import ShopPage from './pages/ShopPage';
import PricingPage from './pages/PricingPage';
import AIChatAssistant from './components/AIChatAssistant';
import { UserProvider, useUser } from './context/UserContext';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, subscription } = useUser();

  return (
    <nav className="sticky top-0 z-50 bg-[#fffaf0]/80 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-[#94a37e] p-2.5 rounded-2xl group-hover:rotate-6 transition-transform duration-300 shadow-sm">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#4a5d4e]">MealMuse</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/generator" className="text-sm font-bold text-slate-600 hover:text-[#94a37e] transition-colors flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Studio</Link>
            <Link to="/shop" className="text-sm font-bold text-slate-600 hover:text-[#94a37e] transition-colors flex items-center gap-1.5"><Store className="w-4 h-4" /> Boutique</Link>
            <Link to="/saved" className="text-sm font-bold text-slate-600 hover:text-[#94a37e] transition-colors flex items-center gap-1.5"><Heart className="w-4 h-4" /> Cookbook</Link>
            
            {subscription !== 'elite' && (
              <Link to="/pricing" className="text-xs font-black bg-amber-100 text-amber-700 px-4 py-2 rounded-full flex items-center gap-1 hover:bg-amber-200 transition-all">
                <Crown className="w-3 h-3 fill-current" /> Upgrade
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-orange-50 shadow-sm">
                <div className="w-8 h-8 bg-[#94a37e] rounded-full flex items-center justify-center text-white text-xs font-black">{user.name[0].toUpperCase()}</div>
                <span className="text-xs font-black text-slate-900">{user.name}</span>
              </div>
            ) : (
              <Link to="/login" className="bg-[#94a37e] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md">Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-[#fffaf0] text-slate-800">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generator" element={<GeneratorPage />} />
              <Route path="/saved" element={<SavedRecipes />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/pricing" element={<PricingPage />} />
            </Routes>
          </main>
          <AIChatAssistant />
        </div>
      </Router>
    </UserProvider>
  );
}
export default App;
