"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";

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
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  // Auth state change listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  // Function to fetch cart from backend
  const fetchCart = useCallback(async () => {
    if (user) {
      try {
        const response = await fetch("/api/cart");
        if (response.ok) {
          const data = await response.json();
          // Transform backend cart items to match frontend CartItem interface
          const transformedItems: CartItem[] = data.items.map((item: any) => ({
            id: item.id,
            product_id: item.product_id,
            name: item.products.name,
            price: item.products.price,
            image: item.products.image,
            brand: item.products.brand,
            quantity: item.quantity,
            hoverImage: item.products.hoverImage,
          }));
          dispatch({ type: "SET_CART", payload: { cartId: data.cartId, items: transformedItems } });
        } else if (response.status === 404) {
          // Cart not found for user, initialize empty cart
          dispatch({ type: "SET_CART", payload: { cartId: null, items: [] } });
        } else {
          console.error("Failed to fetch authenticated cart");
        }
      } catch (error) {
        console.error("Error fetching authenticated cart:", error);
      }
    } else {
      // For guest users, load from localStorage
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart);
          dispatch({ type: "SET_CART", payload: { cartId: null, items: cartItems } });
        } catch (error) {
          console.error("Error loading guest cart from localStorage:", error);
        }
      }
    }
  }, [user]);

  // Load cart on initial mount and when user changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Save guest cart to localStorage whenever it changes (only if no user)
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(state.items));
    } else if (user && localStorage.getItem("cart")) {
      // Clear guest cart from localStorage after merging (or once authenticated cart is loaded)
      localStorage.removeItem("cart");
    }
  }, [state.items, user]);

  // Merge guest cart with authenticated cart on login
  useEffect(() => {
    if (user) {
      const savedGuestCart = localStorage.getItem("cart");
      if (savedGuestCart) {
        try {
          const guestItems: CartItem[] = JSON.parse(savedGuestCart);
          if (guestItems.length > 0) {
            // Iterate and add each guest item to the backend cart
            guestItems.forEach(async (guestItem) => {
              await addToCart(guestItem); // This will call the backend API
            });
            // Clear guest cart from local storage after merging
            localStorage.removeItem("cart");
          }
        } catch (error) {
          console.error("Error parsing guest cart from localStorage for merging:", error);
        }
      }
    }
  }, [user, state.cartId]); // Depend on user and cartId to ensure merge happens after cart is loaded

  const addToCart = useCallback(async (item: Omit<CartItem, "quantity" | "id"> & { id?: string; quantity?: number }) => {
    if (user) {
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: item.product_id, quantity: item.quantity || 1 }),
        });

        if (response.ok) {
          const updatedItem = await response.json();
          // Re-fetch cart to ensure state is synchronized with backend
          fetchCart();
        } else {
          console.error("Failed to add item to authenticated cart");
        }
      } catch (error) {
        console.error("Error adding item to authenticated cart:", error);
      }
    } else {
      // For guest users, update local state directly and sync to localStorage
      dispatch({ type: "ADD_ITEM", payload: item });
    }
  }, [user, fetchCart]);

  const removeFromCart = useCallback(async (id: string) => {
    if (user) {
      try {
        const response = await fetch(`/api/cart/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchCart(); // Re-fetch cart to ensure state is synchronized with backend
        } else {
          console.error("Failed to remove item from authenticated cart");
        }
      } catch (error) {
        console.error("Error removing item from authenticated cart:", error);
      }
    } else {
      // For guest users, update local state directly and sync to localStorage
      dispatch({ type: "REMOVE_ITEM", payload: id });
    }
  }, [user, fetchCart]);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    if (user) {
      try {
        const response = await fetch(`/api/cart/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });
        if (response.ok) {
          fetchCart(); // Re-fetch cart to ensure state is synchronized with backend
        } else {
          console.error("Failed to update item quantity in authenticated cart");
        }
      } catch (error) {
        console.error("Error updating item quantity in authenticated cart:", error);
      }
    } else {
      // For guest users, update local state directly and sync to localStorage
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  }, [user, fetchCart]);

  const clearCart = useCallback(async () => {
    if (user && state.cartId) {
      try {
        // Note: Backend /api/cart currently does not have a CLEAR_ALL endpoint.
        // This would require a DELETE /api/cart operation to clear all items for a user.
        // For now, iterate and delete all items or await a backend endpoint.

        // As a workaround, we can fetch the cart items and delete them one by one.
        const response = await fetch("/api/cart");
        if (response.ok) {
          const data = await response.json();
          for (const item of data.items) {
            await removeFromCart(item.id); // Use the existing removeFromCart logic
          }
        } else {
          console.error("Failed to fetch cart for clearing");
        }
        fetchCart(); // Re-fetch to confirm empty cart
      } catch (error) {
        console.error("Error clearing authenticated cart:", error);
      }
    } else {
      // For guest users, clear local state and localStorage
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("cart");
    }
  }, [user, state.cartId, fetchCart, removeFromCart]);

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
