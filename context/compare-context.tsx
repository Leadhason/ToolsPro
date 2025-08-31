'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CompareContextType {
  isCompareEnabled: boolean;
  toggleCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [isCompareEnabled, setIsCompareEnabled] = useState(false);

  const toggleCompare = () => {
    setIsCompareEnabled(prev => !prev);
  };

  return (
    <CompareContext.Provider value={{ isCompareEnabled, toggleCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
