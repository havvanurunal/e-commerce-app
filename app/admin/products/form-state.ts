import { ProductFormState } from '@/types/products';

export const initialProductFormState: ProductFormState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
};
