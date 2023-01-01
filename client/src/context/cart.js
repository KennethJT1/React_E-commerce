import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // To ensure that when the page is loaded the cart data is not lost
  useEffect(()=> {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) {
      setCart(JSON.parse(existingCart));
    }
  }, [])

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
