"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useState, useCallback } from "react"

export interface CartItem {
  id: string; // cart_item_id from backend
  product_id: string; // product_id from backend
  name: string;
  price: number;
  image: string;
  brand: string;
  quantity: number;
  // Add any other product details you need from the backend join
  hoverImage?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  cartId: string | null; // Added to store the cart ID from the backend
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity" | "id"> & { id?: string; quantity?: number } } // id can be optional for new items, quantity can be optional, defaults to 1
  | { type: "REMOVE_ITEM"; payload: string } // cart_item_id
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } } // cart_item_id
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: { cartId: string | null; items: CartItem[] } }
  | { type: "MERGE_GUEST_CART"; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const productToAdd = action.payload;
      const existingItem = state.items.find((item) => item.product_id === productToAdd.product_id);

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.product_id === productToAdd.product_id
            ? { ...item, quantity: item.quantity + (productToAdd.quantity || 1) }
            : item,
        );
        const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        return { ...state, items: updatedItems, total, itemCount };
      } else {
        const newItem: CartItem = {
          ...productToAdd,
          id: productToAdd.id || "temp-" + Date.now(), // Use temporary ID if not provided by backend yet
          quantity: productToAdd.quantity || 1,
        };
        const updatedItems = [...state.items, newItem];
        const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        return { ...state, items: updatedItems, total, itemCount };
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: updatedItems, total, itemCount };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: action.payload.id });
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      );
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: updatedItems, total, itemCount };
    }

    case "CLEAR_CART":
      return { ...state, items: [], total: 0, itemCount: 0, cartId: null };

    case "SET_CART": {
      const total = action.payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const itemCount = action.payload.items.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: action.payload.items, total, itemCount, cartId: action.payload.cartId };
    }

    case "MERGE_GUEST_CART": {
      let mergedItems = [...state.items];
      action.payload.forEach(guestItem => {
        const existing = mergedItems.find(item => item.product_id === guestItem.product_id);
        if (existing) {
          existing.quantity += guestItem.quantity;
        } else {
          mergedItems.push(guestItem);
        }
      });
      const total = mergedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const itemCount = mergedItems.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: mergedItems, total, itemCount };
    }

    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  cartId: string | null;
  addToCart: (item: Omit<CartItem, "quantity" | "id"> & { id?: string; quantity?: number }) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>; // cart_item_id
  updateQuantity: (id: string, quantity: number) => Promise<void>; // cart_item_id
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    cartId: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check auth status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    
    // Listen for auth changes from other parts of the app
    const handleAuthChange = () => checkAuth();
    window.addEventListener('auth-change', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  // Function to load cart from localStorage only (simplified)
  const loadCart = useCallback(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: "SET_CART", payload: { cartId: null, items: cartItems } });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Load cart on initial mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Save cart to localStorage whenever it changes (simplified)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  // No merging needed since we only use localStorage

  const addToCart = useCallback(async (item: Omit<CartItem, "quantity" | "id"> & { id?: string; quantity?: number }) => {
    // Always use localStorage since cart API is removed
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeFromCart = useCallback(async (id: string) => {
    // Always use localStorage since cart API is removed
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    // Always use localStorage since cart API is removed
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(async () => {
    // Always use localStorage since cart API is removed
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cart");
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
        cartId: state.cartId,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
