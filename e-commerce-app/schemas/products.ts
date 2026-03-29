import z from 'zod';

export const NewProductSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(3, { message: 'Product name must be at least 3 characters!' })
    .max(30, { message: 'Product name must be max 30 characters!' }),
  productDescription: z
    .string()
    .trim()
    .min(10, { message: 'Description must be at least 10 characters!' })
    .max(500, { message: 'Description must be max 500 characters!' }),
  price: z.coerce
    .number()
    .positive({ message: 'Price must be a positive number!' }),
  productImage: z
    .string()
    .url({ message: 'Please enter a valid URL!' })
    .optional()
    .or(z.literal('')),
});

export type NewProductInput = z.infer<typeof NewProductSchema>;

export type NewProductFormInput = {
  productName: string;
  productDescription: string;
  price: number;
  productImage?: string;
};
