'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useActionState } from 'react';
import { Resolver, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditProductFormInput, EditProductSchema } from '@/schemas/products';
import { useRouter } from 'next/navigation';
import { editProductAction } from './actions';
import { initialProductFormState } from '@/app/form-state';
import { ProductFormFields } from '@/components/ProductFormFields';
import type { Product } from '@prisma/client';

export function EditProductForm({ product }: { product: Product }) {
  const [editProductState, editProductFormAction, isPending] = useActionState(
    editProductAction,
    initialProductFormState
  );
  const router = useRouter();

  const safeState = editProductState ?? initialProductFormState;
  const fieldErrors = safeState.fieldErrors ?? {};

  const {
    register,
    formState: { errors: clientFormErrors },
  } = useForm<EditProductFormInput>({
    mode: 'onBlur',
    resolver: zodResolver(EditProductSchema) as Resolver<EditProductFormInput>,
  });

  useEffect(() => {
    if (editProductState.status === 'success') {
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);
    }
  }, [editProductState.status]);

  if (isPending) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4 font-sans'>
        <span>
          <Spinner data-icon='inline-start' /> Updating Product...
        </span>
      </div>
    );
  }

  if (editProductState.status === 'success') {
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
    <form action={editProductFormAction}>
      <input type='hidden' name='id' value={product.id} />
      <div className='flex flex-col max-w-xl mx-auto mt-10 gap-4'>
        <ProductFormFields
          fieldErrors={fieldErrors}
          formRegisterAction={register as UseFormRegister<EditProductFormInput>}
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
