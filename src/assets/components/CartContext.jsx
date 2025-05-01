import { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id && item.size === product.size);
      
      if (existingItem) {
        // Si ya existe, actualiza la cantidad
        return currentCart.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
            : item
        );
      } else {
        // Si no existe, añade con un ID único
        return [
          ...currentCart,
          {
            ...product,
            cartId: `${product.id}-${product.size || 'standard'}-${Date.now()}`,
            quantity: product.quantity || 1
          }
        ];
      }
    });
  };

  const removeFromCart = (cartId, removeAll = false) => {
    setCart(currentCart => {
      if (removeAll) {
        return currentCart.filter(item => !(
          item.id === cartId || 
          item.cartId === cartId
        ));
      }
      return currentCart.filter(item => item.cartId !== cartId);
    });
  };

  const updateQuantity = (cartId, newQuantity) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.cartId === cartId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
        cartTotal: cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};