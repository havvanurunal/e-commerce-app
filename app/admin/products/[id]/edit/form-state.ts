export type EditProductFormState = {
  status: 'idle' | 'error' | 'success';
  message: string;
  fieldErrors: {
    productName?: string;
    productBrand?: string;
    productDescription?: string;
    price?: string;
    images?: string;
    stock?: string;
    category?: string;
  };
};

export const initialEditProductFormState: EditProductFormState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
};
