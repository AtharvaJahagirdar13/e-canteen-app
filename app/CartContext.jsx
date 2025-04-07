// CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    console.log('Adding to cart:', item); // Debug log
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      const updatedItems = existingItem
        ? prevItems.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prevItems, { ...item, quantity: 1 }];
      console.log('Updated cart:', updatedItems); // Debug log
      return updatedItems;
    });
  };

  const removeFromCart = (itemOrId) => {
    const id = typeof itemOrId === 'object' ? itemOrId.id : itemOrId;
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity if more than 1
        return prevItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      // Remove item if quantity would become 0
      return prevItems.filter(item => item.id !== id);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
