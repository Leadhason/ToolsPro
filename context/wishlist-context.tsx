"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";

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

  // Function to fetch wishlist from backend
  const fetchWishlist = useCallback(async () => {
    if (user) {
      try {
        const response = await fetch("/api/wishlist");
        if (response.ok) {
          const data = await response.json();
          // Transform backend wishlist items to match frontend WishlistItem interface
          const transformedItems: WishlistItem[] = data.map((item: any) => ({
            id: item.product_id,
            name: item.products.name,
            price: item.products.price,
            image: item.products.image,
            brand: item.products.brand,
            rating: item.products.rating,
            reviewCount: item.products.review_count,
            hoverImage: item.products.hoverImage,
          }));
          dispatch({ type: "SET_WISHLIST", payload: transformedItems });
        } else {
          console.error("Failed to fetch authenticated wishlist");
        }
      } catch (error) {
        console.error("Error fetching authenticated wishlist:", error);
      }
    } else {
      // For guest users, load from localStorage
      const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
          const wishlistItems = JSON.parse(savedWishlist);
          dispatch({ type: "SET_WISHLIST", payload: wishlistItems });
      } catch (error) {
          console.error("Error loading guest wishlist from localStorage:", error);
        }
      }
    }
  }, [user]);

  // Load wishlist on initial mount and when user changes
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Save guest wishlist to localStorage whenever it changes (only if no user)
  useEffect(() => {
    if (!user) {
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    } else if (user && localStorage.getItem("wishlist")) {
      // Clear guest wishlist from localStorage after merging (or once authenticated wishlist is loaded)
      localStorage.removeItem("wishlist");
    }
  }, [state.items, user]);

  // Merge guest wishlist with authenticated wishlist on login
  useEffect(() => {
    if (user) {
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
  }, [user]); // Depend on user to ensure merge happens on login

  const addToWishlist = useCallback(async (item: Omit<WishlistItem, "id"> & { id: string }) => {
    if (user) {
      try {
        const response = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: item.id }),
        });

        if (response.ok || response.status === 200) { // 200 if already in wishlist
          fetchWishlist(); // Re-fetch wishlist to ensure state is synchronized with backend
        } else {
          console.error("Failed to add item to authenticated wishlist");
        }
      } catch (error) {
        console.error("Error adding item to authenticated wishlist:", error);
      }
    } else {
      // For guest users, update local state directly and sync to localStorage
      dispatch({ type: "ADD_ITEM", payload: item });
    }
  }, [user, fetchWishlist]);

  const removeFromWishlist = useCallback(async (id: string) => {
    if (user) {
      try {
        const response = await fetch(`/api/wishlist/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchWishlist(); // Re-fetch wishlist to ensure state is synchronized with backend
        } else {
          console.error("Failed to remove item from authenticated wishlist");
        }
      } catch (error) {
        console.error("Error removing item from authenticated wishlist:", error);
      }
    } else {
      // For guest users, update local state directly and sync to localStorage
      dispatch({ type: "REMOVE_ITEM", payload: id });
    }
  }, [user, fetchWishlist]);

  const clearWishlist = useCallback(async () => {
    if (user) {
      try {
        // As a workaround, we can fetch the wishlist items and delete them one by one.
        const response = await fetch("/api/wishlist");
        if (response.ok) {
          const data = await response.json();
          for (const item of data) {
            await removeFromWishlist(item.id); // Use the existing removeFromWishlist logic
          }
        } else {
          console.error("Failed to fetch wishlist for clearing");
        }
        fetchWishlist(); // Re-fetch to confirm empty wishlist
      } catch (error) {
        console.error("Error clearing authenticated wishlist:", error);
      }
    } else {
      // For guest users, clear local state and localStorage
      dispatch({ type: "CLEAR_WISHLIST" });
      localStorage.removeItem("wishlist");
    }
  }, [user, fetchWishlist, removeFromWishlist]);

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
