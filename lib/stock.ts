import { boolean } from 'zod';

export function getLowStockLabel(stock: number): string | null {
  if (stock > 0 && stock < 5) {
    return 'Low Stock';
  }
  return null;
}

export function isOutOfStock(stock: number): string | null {
  if (stock === 0) {
    return 'Out of Stock';
  }
  return null;
}
