'use client';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useActionState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewProductFormInput, NewProductInput } from '@/schemas/products';
import { NewProductSchema } from '@/schemas/products';
import { addProduct } from '@/app/actions/productActions';
import { useRouter } from 'next/navigation';

export type ProductError = {
  productName?: string[];
  productDescription?: string[];
  price?: string[];
  productImage?: string[];
};

export type NewProductFormState = {
  success: boolean;
  errors?: ProductError;
  data?: Partial<NewProductInput>;
  message?: string;
};

const initialFormState: NewProductFormState = {
  success: false,
};

export default function NewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState<
    NewProductFormState,
    FormData
  >(addProduct, initialFormState);
  const router = useRouter();

  const {
    register,
    formState: { errors: clientFormErrors },
  } = useForm<NewProductFormInput>({
    mode: 'onBlur',
    resolver: zodResolver(NewProductSchema) as any,
  });

  const productNameError =
    clientFormErrors?.productName?.message || state.errors?.productName?.[0];
  const productDescriptionError =
    clientFormErrors?.productDescription?.message ||
    state.errors?.productDescription?.[0];
  const priceError =
    clientFormErrors?.price?.message || state.errors?.price?.[0];

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [state.success]);

  if (isPending) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4 font-sans'>
        <span>
          <Spinner data-icon='inline-start' /> Saving Product...
        </span>
      </div>
    );
  }

  if (state.success) {
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
    <form action={dispatchAction}>
      <div className='flex flex-col max-w-xl mx-auto mt-10 gap-4'>
        <Field>
          <FieldLabel htmlFor='product-name'>Product Name</FieldLabel>
          <Input
            id='product-name'
            type='text'
            placeholder='Product name'
            aria-describedby='product-name-error'
            defaultValue={state?.data?.productName || ''}
            {...register('productName')}
          />

          {productNameError && (
            <FieldDescription id='product-name-error' variant='error'>
              {productNameError}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='product-description'>Description</FieldLabel>
          <Textarea
            id='product-description'
            placeholder='Product description'
            className='resize-none'
            aria-describedby='product-description-error'
            defaultValue={state?.data?.productDescription || ''}
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
            aria-describedby='product-price-error'
            defaultValue={state?.data?.productName || ''}
            {...register('price')}
          />

          {priceError && (
            <FieldDescription id='product-price-error' variant='error'>
              {priceError}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='product-image'>Image URL</FieldLabel>
          <Input
            id='product-image'
            type='text'
            placeholder='https://example.com/image.jpg'
            aria-describedby='product-image-error'
            {...register('productImage')}
          />
        </Field>

        <Field orientation='horizontal'>
          <Button variant='secondary' type='submit'>
            Save Product
          </Button>
          <Button variant='secondary' type='reset'>
            Clear
          </Button>
        </Field>
      </div>
    </form>
  );
}
