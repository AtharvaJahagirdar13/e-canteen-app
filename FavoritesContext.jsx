import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (item) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.find(favItem => favItem.id === item.id)) {
        return [...prevFavorites, item];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (itemId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(item => item.id !== itemId)
    );
  };

  const isFavorite = (itemId) => {
    return favorites.some(item => item.id === itemId);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}
