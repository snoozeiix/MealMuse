import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState('free');
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('mealmuse_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setSubscription(parsed.subscription || 'free');
    }
    const saved = localStorage.getItem('mealmuse_saved');
    if (saved) setSavedRecipes(JSON.parse(saved));
  }, []);

  const login = (userData) => {
    const userWithSub = { ...userData, subscription: 'free' };
    setUser(userWithSub);
    localStorage.setItem('mealmuse_user', JSON.stringify(userWithSub));
  };

  const upgradeSubscription = (plan) => {
    setSubscription(plan);
    if (user) {
      const updatedUser = { ...user, subscription: plan };
      setUser(updatedUser);
      localStorage.setItem('mealmuse_user', JSON.stringify(updatedUser));
    }
  };

  const toggleSaveRecipe = (recipe) => {
    setSavedRecipes(prev => {
      const exists = prev.find(r => r.name === recipe.name);
      const next = exists ? prev.filter(r => r.name !== recipe.name) : [...prev, recipe];
      localStorage.setItem('mealmuse_saved', JSON.stringify(next));
      return next;
    });
  };

  return (
    <UserContext.Provider value={{ user, login, subscription, upgradeSubscription, savedRecipes, toggleSaveRecipe }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
