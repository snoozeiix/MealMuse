import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Sparkles, DollarSign, Brain, Heart, Flame, ShoppingCart } from 'lucide-react';
import { useUser } from '../context/UserContext';

const GeneratorPage = () => {
  const { toggleSaveRecipe, savedRecipes } = useUser();
  const [budget, setBudget] = useState(50);
  const [goal, setGoal] = useState('Maintain');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setRecipe({
        name: goal === 'Muscle Bulk' ? 'Steak & Sweet Potato Plate' : 'Lemon Herb Zoodle Bowl',
        calories: goal === 'Muscle Bulk' ? '850 kcal' : '320 kcal',
        protein: goal === 'Muscle Bulk' ? '55g' : '25g',
        time: '20 mins',
        price: '$15.00',
        ingredients: ['2 medium zucchinis', '150g Grilled chicken', '1 tbsp Olive oil', '1 Lemon'],
        instructions: 'Spiralize zucchinis. Sauté with garlic and oil. Top with chicken and lemon.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'
      });
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
      <div className="space-y-8">
        <h1 className="text-6xl font-black text-slate-900">Craft Your <span className="text-[#94a37e]">Culinary Identity.</span></h1>
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-orange-50 space-y-8">
          <div>
            <label className="text-xs font-black uppercase text-slate-400">Budget: ${budget}</label>
            <input type="range" min="10" max="300" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full h-2 bg-slate-100 rounded-lg appearance-none accent-[#94a37e]" />
          </div>
          <button onClick={handleGenerate} className="w-full bg-[#94a37e] py-6 rounded-2xl text-white font-black text-lg shadow-xl flex items-center justify-center gap-3">
            {isGenerating ? "Brewing..." : <><Sparkles /> Generate Inspiration</>}
          </button>
        </div>
      </div>

      <div className="sticky top-32">
        {recipe && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-orange-50">
            <img src={recipe.image} className="h-72 w-full object-cover" />
            <div className="p-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black">{recipe.name}</h2>
                <button onClick={() => toggleSaveRecipe(recipe)} className={`p-4 rounded-xl shadow-lg ${savedRecipes.some(r => r.name === recipe.name) ? 'bg-pink-500 text-white' : 'bg-white text-slate-400'}`}>
                  <Heart fill={savedRecipes.some(r => r.name === recipe.name) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-slate-50 p-4 rounded-2xl font-black text-sm text-center"><Flame className="mx-auto mb-2 text-orange-400"/> {recipe.calories}</div>
                 <div className="bg-slate-50 p-4 rounded-2xl font-black text-sm text-center"><ShoppingCart className="mx-auto mb-2 text-[#94a37e]"/> {recipe.price}</div>
              </div>
              <h4 className="font-black text-xs uppercase text-slate-400 mb-4">Ingredients</h4>
              <ul className="space-y-2 mb-8">
                {recipe.ingredients.map((ing, i) => <li key={i} className="text-sm font-bold text-slate-600 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#94a37e] rounded-full"/> {ing}</li>)}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default GeneratorPage;
