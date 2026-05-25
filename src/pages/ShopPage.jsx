import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Crown, ExternalLink } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ShopPage = () => {
  const { subscription } = useUser();
  const products = [
    { id: 1, name: 'Matcha Whisk Set', price: '$45.00', badge: 'Editor Pick', isPremium: false, image: 'https://images.unsplash.com/photo-1582793988951-9aed55099993?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Elite Superfoods', price: '$89.00', badge: 'Partner Pick', isPremium: true, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400' }
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-6xl font-black mb-16">MealMuse <span className="text-[#94a37e]">Boutique</span></h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-orange-50 group">
            <div className="h-80 relative overflow-hidden">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
              {product.isPremium && <div className="absolute top-6 right-6 bg-amber-400 p-2.5 rounded-full text-white shadow-lg"><Crown size={16} /></div>}
            </div>
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black">{product.name}</h3>
                <span className="font-black text-slate-900">{product.price}</span>
              </div>
              {product.isPremium && subscription === 'free' ? (
                <button className="w-full py-4 bg-amber-400 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2"><Crown size={14} /> UNLOCK WITH ELITE</button>
              ) : (
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm">View Details</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShopPage;
