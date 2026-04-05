'use client';

import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductFormInput, CreateProductInput } from '@/schemas/products';
import { CreateProductSchema } from '@/schemas/products';
import { useRouter } from 'next/navigation';
import { createProductAction } from '@/app/admin/products/new/actions';
import { initialCreateProductFormState } from '@/app/admin/products/new/form-state';

export type ProductError = {
  productName?: string[];
  productBrand?: string[];
  productDescription?: string[];
  price?: string[];
  images?: string[];
  stock?: string[];
};

export function NewProductForm() {
  const [state, formAction, isPending] = useActionState(
    createProductAction,
    initialCreateProductFormState
  );
  const router = useRouter();

  const safeState = state ?? initialCreateProductFormState;
  const fieldErrors = safeState.fieldErrors ?? {};

  const {
    register,
    formState: { errors: clientFormErrors },
  } = useForm<CreateProductFormInput>({
    mode: 'onBlur',
    resolver: zodResolver(CreateProductSchema) as any,
  });

  const productNameError =
    clientFormErrors?.productName?.message || fieldErrors?.productName?.[0];
  const productBrandError =
    clientFormErrors?.productBrand?.message || fieldErrors?.productName?.[0];
  const productDescriptionError =
    clientFormErrors?.productDescription?.message ||
    fieldErrors?.productDescription?.[0];
  const priceError =
    clientFormErrors?.price?.message || fieldErrors?.price?.[0];
  const stockError =
    clientFormErrors?.stock?.message || fieldErrors?.stock?.[0];
  const imageError = fieldErrors?.images?.[0];

  useEffect(() => {
    if (state.status === 'success') {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [state.status]);

  if (isPending) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4 font-sans'>
        <span>
          <Spinner data-icon='inline-start' /> Saving Product...
        </span>
      </div>
    );
  }

  if (state.status === 'success') {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4 font-sans'>
        <h1 className='text-2xl font-bold mb-4'>
          A new product added successfully!
        </h1>
        <p>Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <div className='flex flex-col max-w-xl mx-auto mt-10 gap-4'>
        <Field>
          <FieldLabel htmlFor='product-name'>Product Name</FieldLabel>
          <Input
            id='product-name'
            type='text'
            placeholder='Product name'
            aria-invalid={Boolean(
              clientFormErrors?.productName || fieldErrors?.productName
            )}
            aria-describedby='product-name-error'
            {...register('productName')}
          />

          {productNameError && (
            <FieldDescription id='product-name-error' variant='error'>
              {productNameError}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='product-brand'>Brand</FieldLabel>
          <Input
            id='product-brand'
            type='text'
            placeholder='Brand name'
            aria-invalid={Boolean(
              clientFormErrors?.productBrand || fieldErrors?.productBrand
            )}
            aria-describedby='product-brand-error'
            {...register('productBrand')}
          />

          {productBrandError && (
            <FieldDescription id='product-brand-error' variant='error'>
              {productBrandError}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='product-description'>Description</FieldLabel>
          <Textarea
            id='product-description'
            placeholder='Product description'
            className='resize-none'
            aria-invalid={Boolean(
              clientFormErrors?.productDescription ||
                fieldErrors?.productDescription
            )}
            aria-describedby='product-description-error'
            {...register('productDescription')}
          />

          {productDescriptionError && (
            <FieldDescription id='product-description-error' variant='error'>
              {productDescriptionError}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='product-price'>Price</FieldLabel>
          <Input
            id='product-price'
            type='number'
            placeholder='0.00'
            step='0.01'
            aria-invalid={Boolean(
              clientFormErrors?.price || fieldErrors?.price
            )}
            aria-describedby='product-price-error'
            {...register('price')}
          />

          {priceError && (
            <FieldDescription id='product-price-error' variant='error'>
              {priceError}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='product-stock'>Stock</FieldLabel>
          <Input
            id='product-stock'
            type='number'
            placeholder='0'
            aria-invalid={Boolean(
              clientFormErrors?.stock || fieldErrors?.stock
            )}
            aria-describedby='product-stock-error'
            {...register('stock')}
          />
          {stockError && (
            <FieldDescription id='product-stock-error' variant='error'>
              {stockError}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='images'>Product Images</FieldLabel>
          <Input
            id='images'
            type='file'
            multiple
            accept='image/*'
            aria-invalid={Boolean(fieldErrors?.images)}
            aria-describedby='images-error'
            name='images'
          />
          {imageError && (
            <FieldDescription id='images-error' variant='error'>
              {String(imageError)}
            </FieldDescription>
          )}
        </Field>

        {safeState.message && (
          <p
            className={
              safeState.status === 'success'
                ? 'text-sm text-emerald-500'
                : 'text-sm text-red-500'
            }
          >
            {safeState.message}
          </p>
        )}

        <Field orientation='horizontal'>
          <Button variant='secondary' type='submit' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Product'}
          </Button>
          <Button variant='secondary' type='reset'>
            Clear
          </Button>
        </Field>
      </div>
    </form>
  );
}
