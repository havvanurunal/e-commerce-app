'use client';

import { CartItem, Product } from '@prisma/client';
import { useCart } from './CartProvider';
import CartContents from './CartContents';

export function CartDrawer({
  cartItems,
}: {
  cartItems: (CartItem & { product: Product })[];
}) {
  const { isOpen, setIsOpen } = useCart();

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <CartContents cartItems={cartItems} isDrawer={true} />
      </div>
    </>
  );
}
