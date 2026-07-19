import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://127.0.0.1:8000';
  const [cart, setCart] = useState([]);

  // fetch Cart 
  const fetchCart = async () => {
    try {
      const res = await fetch(`${BASE_URL}/cart/`);
      if (!res.ok) {
        throw new Error("Failed to fetch cart");
      } else {
        const data = await res.json();
        const formattedCart = data.map(item => ({
            ...item.product,
            cartItemId: item.id,
            quantity: item.quantity
        }));
        setCart(formattedCart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // add product
  const addProduct = async (product) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/add/${product.id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!res.ok) {
        throw new Error("Failed to add product");
      }
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // remove product
  const removeProduct = async (product) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/remove/${product.id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to remove product");
      }
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  // update quantity
  const updateQuantity = async (product, quantity) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/update/${product.id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) {
        throw new Error("Failed to update quantity");
      }
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
