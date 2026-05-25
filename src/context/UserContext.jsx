import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState('free'); // free, plus, elite
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [preferences, setPreferences] = useState({
    dietary: [],
    budget: 50,
    goals: 'health',
    pantryMode: false
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('mealmuse_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setSubscription(parsed.subscription || 'free');
    }
    
    const savedRecipesLocal = localStorage.getItem('mealmuse_saved');
    if (savedRecipesLocal) setSavedRecipes(JSON.parse(savedRecipesLocal));
  }, []);

  const login = (userData) => {
    const userWithSub = { ...userData, subscription: 'free' };
    setUser(userWithSub);
    localStorage.setItem('mealmuse_user', JSON.stringify(userWithSub));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mealmuse_user');
  };

  const upgradeSubscription = (plan) => {
    setSubscription(plan);
    const updatedUser = { ...user, subscription: plan };
    setUser(updatedUser);
    localStorage.setItem('mealmuse_user', JSON.stringify(updatedUser));
  };

  const toggleSaveRecipe = (recipe) => {
    setSavedRecipes(prev => {
      const exists = prev.find(r => r.name === recipe.name);
      let next;
      if (exists) {
        next = prev.filter(r => r.name !== recipe.name);
      } else {
        next = [...prev, recipe];
      }
      localStorage.setItem('mealmuse_saved', JSON.stringify(next));
      return next;
    });
  };

  return (
    <UserContext.Provider value={{ 
      user, login, logout, subscription, 
      upgradeSubscription, savedRecipes, 
      toggleSaveRecipe, preferences, setPreferences
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
