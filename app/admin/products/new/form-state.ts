export type CreateProductFormState = {
  status: 'idle' | 'error' | 'success';
  message: string;
  fieldErrors: {
    productName?: string;
    productBrand?: string;
    productDescription?: string;
    price?: string;
    images?: string;
    stock?: string;
  };
};

export const initialCreateProductFormState: CreateProductFormState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
};
