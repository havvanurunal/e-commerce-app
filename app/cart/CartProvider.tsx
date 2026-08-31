'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext({
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsOpen: (_value: boolean) => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
