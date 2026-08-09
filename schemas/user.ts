import z from 'zod';

export const UpdateUserSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(3, { message: 'Firstname must be at least 3 characters!' })
    .max(50, { message: 'First name must be max 50 characters!' }),
  lastname: z
    .string()
    .trim()
    .min(3, { message: 'Lastname must be at least 3 characters!' })
    .max(50, { message: 'Lastname must be max 50 characters!' }),
  phoneNumber: z
    .string()
    .trim()
    .min(7, { message: 'Phone number must be at least 7 characters!' })
    .max(16, { message: 'Phone number must be max 16 characters!' }),
  address: z.object({
    line1: z
      .string()
      .trim()
      .min(5, { message: 'Address line must be at least 5 characters!' })
      .max(100, { message: 'Address line must be max 100 characters!' }),
    city: z
      .string()
      .trim()
      .min(2, { message: 'City must be at least 2 characters!' })
      .max(30, { message: 'City must be max 30 characters!' }),
    postalCode: z
      .string()
      .trim()
      .min(4, { message: 'Postal code must be at least 4 characters!' })
      .max(15, { message: 'Postal code must be max 15 characters!' }),
    country: z
      .string()
      .trim()
      .min(2, { message: 'Country must be at least 2 characters!' })
      .max(30, { message: 'Country must be max 30 characters!' }),
  }),
});
