"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useState, useCallback } from "react"

export interface WishlistItem {
  id: string; // product_id from backend
  name: string;
  price: number;
  image: string;
  brand: string;
  rating?: number;
  reviewCount?: number;
  hoverImage?: string; // Add hoverImage for consistency
}

interface WishlistState {
  items: WishlistItem[];
  itemCount: number;
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string } // product_id
  | { type: "CLEAR_WISHLIST" }
  | { type: "SET_WISHLIST"; payload: WishlistItem[] }
  | { type: "MERGE_GUEST_WISHLIST"; payload: WishlistItem[] };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item already in wishlist
      }
      const updatedItems = [...state.items, action.payload];
      return { items: updatedItems, itemCount: updatedItems.length };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      return { items: updatedItems, itemCount: updatedItems.length };
    }

    case "CLEAR_WISHLIST":
      return { items: [], itemCount: 0 };

    case "SET_WISHLIST":
      return { items: action.payload, itemCount: action.payload.length };

    case "MERGE_GUEST_WISHLIST": {
      let mergedItems = [...state.items];
      action.payload.forEach(guestItem => {
        const existing = mergedItems.find(item => item.id === guestItem.id);
        if (!existing) {
          mergedItems.push(guestItem);
        }
      });
      return { items: mergedItems, itemCount: mergedItems.length };
    }

    default:
      return state;
  }
};

interface WishlistContextType {
  items: WishlistItem[];
  itemCount: number;
  addToWishlist: (item: Omit<WishlistItem, "id"> & { id: string }) => Promise<void>; // Ensure id is always present when adding
  removeFromWishlist: (id: string) => Promise<void>; // product_id
  clearWishlist: () => Promise<void>;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0,
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

  // Function to load wishlist from localStorage only
  const loadWishlist = useCallback(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        dispatch({ type: "SET_WISHLIST", payload: wishlistItems });
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error);
      }
    } else {
      dispatch({ type: "SET_WISHLIST", payload: [] });
    }
  }, []);

  // Load wishlist on initial mount
  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  // Save guest wishlist to localStorage whenever it changes (only if no user)
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    } else if (isAuthenticated && localStorage.getItem("wishlist")) {
      // Clear guest wishlist from localStorage after merging (or once authenticated wishlist is loaded)
      localStorage.removeItem("wishlist");
    }
  }, [state.items, isAuthenticated]);

  // Merge guest wishlist with authenticated wishlist on login
  useEffect(() => {
    if (isAuthenticated) {
      const savedGuestWishlist = localStorage.getItem("wishlist");
      if (savedGuestWishlist) {
        try {
          const guestItems: WishlistItem[] = JSON.parse(savedGuestWishlist);
          if (guestItems.length > 0) {
            guestItems.forEach(async (guestItem) => {
              await addToWishlist(guestItem); // This will call the backend API
            });
            localStorage.removeItem("wishlist"); // Clear guest wishlist from local storage after merging
          }
        } catch (error) {
          console.error("Error parsing guest wishlist from localStorage for merging:", error);
        }
      }
    }
  }, [isAuthenticated]); // Depend on auth state to ensure merge happens on login

  const addToWishlist = useCallback(async (item: WishlistItem) => {
    // Always use localStorage since wishlist API is removed
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeFromWishlist = useCallback(async (id: string) => {
    // Always use localStorage since wishlist API is removed
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const clearWishlist = useCallback(async () => {
    // Always use localStorage since wishlist API is removed
    dispatch({ type: "CLEAR_WISHLIST" });
    localStorage.removeItem("wishlist");
  }, []);

  const isInWishlist = useCallback((id: string) => {
    return state.items.some((item) => item.id === id);
  }, [state.items]);

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        itemCount: state.itemCount,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
