"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  brand: string
  rating?: number
  reviewCount?: number
}

interface WishlistState {
  items: WishlistItem[]
  itemCount: number
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistItem[] }

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return state // Item already in wishlist
      }

      const updatedItems = [...state.items, action.payload]
      return { items: updatedItems, itemCount: updatedItems.length }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload)
      return { items: updatedItems, itemCount: updatedItems.length }
    }

    case "CLEAR_WISHLIST":
      return { items: [], itemCount: 0 }

    case "LOAD_WISHLIST":
      return { items: action.payload, itemCount: action.payload.length }

    default:
      return state
  }
}

interface WishlistContextType {
  items: WishlistItem[]
  itemCount: number
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0,
  })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist)
        dispatch({ type: "LOAD_WISHLIST", payload: wishlistItems })
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.items))
  }, [state.items])

  const addToWishlist = (item: WishlistItem) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeFromWishlist = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
  }

  const isInWishlist = (id: string) => {
    return state.items.some((item) => item.id === id)
  }

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
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
