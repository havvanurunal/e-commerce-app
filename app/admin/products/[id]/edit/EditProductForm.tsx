'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditProductFormInput, EditProductSchema } from '@/schemas/products';
import { useRouter } from 'next/navigation';
import { editProductAction } from './actions';
import { initialEditProductFormState } from './form-state';
import { ProductFormFields } from '@/components/ProductFormFields';
import type { Product } from '@prisma/client';

export type ProductError = {
  productName?: string[];
  productBrand?: string[];
  productDescription?: string[];
  price?: string[];
  images?: string[];
  stock?: string[];
  category?: string[];
};

export function EditProductForm({ product }: { product: Product }) {
  const boundAction = editProductAction.bind(null, product.id);

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialEditProductFormState
  );
  const router = useRouter();

  const safeState = state ?? initialEditProductFormState;
  const fieldErrors = safeState.fieldErrors ?? {};

  const {
    register,
    formState: { errors: clientFormErrors },
  } = useForm<EditProductFormInput>({
    mode: 'onBlur',
    resolver: zodResolver(EditProductSchema) as any,
  });

  useEffect(() => {
    if (state.status === 'success') {
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);
    }
  }, [state.status]);

  if (isPending) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4 font-sans'>
        <span>
          <Spinner data-icon='inline-start' /> Updating Product...
        </span>
      </div>
    );
  }

  if (state.status === 'success') {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4 font-sans'>
        <h1 className='text-2xl font-bold mb-4'>
          Product updated successfully!
        </h1>
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <div className='flex flex-col max-w-xl mx-auto mt-10 gap-4'>
        <ProductFormFields
          fieldErrors={fieldErrors}
          formRegisterAction={register as any}
          clientFormErrors={clientFormErrors}
          defaultValues={product}
          isEdit={true}
        />

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

        <div className='flex gap-2'>
          <Button variant='secondary' type='submit' disabled={isPending}>
            {isPending ? 'Updating...' : 'Update Product'}
          </Button>
          <Button
            variant='secondary'
            type='button'
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
