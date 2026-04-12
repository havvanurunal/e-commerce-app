import z from 'zod';

export const BaseProductSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(3, { message: 'Product name must be at least 3 characters!' })
    .max(30, { message: 'Product name must be max 30 characters!' }),
  productBrand: z
    .string()
    .trim()
    .min(3, { message: 'Product brand name must be at least 3 characters!' })
    .max(30, { message: 'Product brand name must be max 30 characters!' }),
  productDescription: z
    .string()
    .trim()
    .min(10, { message: 'Description must be at least 10 characters!' })
    .max(500, { message: 'Description must be max 500 characters!' }),
  price: z.coerce
    .number()
    .positive({ message: 'Price must be a positive number!' }),
  stock: z.coerce
    .number()
    .int({ message: 'Stock must be a whole number!' })
    .nonnegative({ message: 'Stock must be 0 or more!' }),
  category: z
    .string()
    .trim()
    .min(3, { message: 'Category must be at least 3 characters!' })
    .max(30, { message: 'Category must be max 30 characters!' }),
});

export const CreateProductSchema = BaseProductSchema.extend({
  images: z
    .array(z.instanceof(File))
    .min(1, 'Upload at least one image.')
    .refine(
      (files) => files.every((file) => file.size > 0),
      'One or more selected files are empty.'
    )
    .refine(
      (files) => files.every((file) => file.type.startsWith('image/')),
      'All uploaded files must be images.'
    ),
});

export const EditProductSchema = BaseProductSchema.extend({
  images: z
    .array(z.instanceof(File))
    .optional()
    .refine(
      (files) =>
        !files || files.every((file) => file.type.startsWith('image/')),
      'All uploaded files must be images.'
    ),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type EditProductInput = z.infer<typeof EditProductSchema>;

export type CreateProductFormInput = {
  productName: string;
  productBrand: string;
  productDescription: string;
  price: number;
  stock: number;
  category: string;
};

export type EditProductFormInput = {
  productName: string;
  productBrand: string;
  productDescription: string;
  price: number;
  stock: number;
  category: string;
};

export function getFileName(file: File, index: number): string {
  const fileExtension = file.name.includes('.')
    ? file.name.split('.').pop()?.toLowerCase()
    : undefined;
  const safeExtension = fileExtension
    ? `.${fileExtension.replace(/[^a-z0-9]/g, '')}`
    : '';
  return `products/${Date.now()}-${index}${safeExtension}`;
}
