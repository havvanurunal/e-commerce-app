'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useActionState } from 'react';
import { Resolver, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductFormInput } from '@/schemas/products';
import { CreateProductSchema } from '@/schemas/products';
import { useRouter } from 'next/navigation';
import { createProductAction } from '@/app/admin/products/new/actions';
import { initialProductFormState } from '@/app/admin/products/form-state';
import { ProductFormFields } from '@/components/ProductFormFields';

export function NewProductForm() {
  const [state, formAction, isPending] = useActionState(
    createProductAction,
    initialProductFormState
  );
  const router = useRouter();

  const safeState = state ?? initialProductFormState;
  const fieldErrors = safeState.fieldErrors ?? {};

  const {
    register,
    formState: { errors: clientFormErrors },
  } = useForm<CreateProductFormInput>({
    mode: 'onBlur',
    resolver: zodResolver(
      CreateProductSchema
    ) as Resolver<CreateProductFormInput>,
  });

  useEffect(() => {
    if (state.status === 'success') {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [state.status]);

  if (isPending) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4'>
        <span>
          <Spinner data-icon='inline-start' /> Saving Product...
        </span>
      </div>
    );
  }

  if (state.status === 'success') {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4'>
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
        <ProductFormFields
          fieldErrors={fieldErrors}
          formRegisterAction={
            register as UseFormRegister<CreateProductFormInput>
          }
          clientFormErrors={clientFormErrors}
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
            {isPending ? 'Saving...' : 'Save Product'}
          </Button>
          <Button variant='secondary' type='reset'>
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
}
