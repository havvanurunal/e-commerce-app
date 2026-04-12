'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import {
  CreateProductFormInput,
  EditProductFormInput,
} from '@/schemas/products';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

type FormInput = CreateProductFormInput | EditProductFormInput;

type ProductFormFieldsProps = {
  fieldErrors: {
    productName?: string;
    productBrand?: string;
    productDescription?: string;
    price?: string;
    stock?: string;
    category?: string;
    images?: string;
  };
  defaultValues?: {
    productName?: string;
    productBrand?: string;
    productDescription?: string;
    price?: number;
    stock?: number;
    category?: string;
  };
  formRegisterAction?: UseFormRegister<FormInput>;
  clientFormErrors?: FieldErrors<FormInput>;
  isEdit?: boolean;
};

export function ProductFormFields({
  fieldErrors,
  defaultValues,
  formRegisterAction,
  clientFormErrors,
  isEdit = false,
}: ProductFormFieldsProps) {
  const productNameError =
    clientFormErrors?.productName?.message || fieldErrors?.productName;
  const productBrandError =
    clientFormErrors?.productBrand?.message || fieldErrors?.productBrand;
  const productDescriptionError =
    clientFormErrors?.productDescription?.message ||
    fieldErrors?.productDescription;
  const priceError = clientFormErrors?.price?.message || fieldErrors?.price;
  const stockError = clientFormErrors?.stock?.message || fieldErrors?.stock;
  const categoryError =
    clientFormErrors?.category?.message || fieldErrors?.category;

  return (
    <>
      <Field>
        <FieldLabel htmlFor='product-name'>Product Name</FieldLabel>
        <Input
          id='product-name'
          type='text'
          placeholder='Product name'
          defaultValue={defaultValues?.productName}
          aria-invalid={Boolean(
            clientFormErrors?.productName || fieldErrors?.productName
          )}
          aria-describedby='product-name-error'
          {...(formRegisterAction
            ? formRegisterAction('productName')
            : { name: 'productName' })}
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
          defaultValue={defaultValues?.productBrand}
          aria-invalid={Boolean(
            clientFormErrors?.productBrand || fieldErrors?.productBrand
          )}
          aria-describedby='product-brand-error'
          {...(formRegisterAction
            ? formRegisterAction('productBrand')
            : { name: 'productBrand' })}
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
          defaultValue={defaultValues?.productDescription}
          aria-invalid={Boolean(
            clientFormErrors?.productDescription ||
              fieldErrors?.productDescription
          )}
          aria-describedby='product-description-error'
          {...(formRegisterAction
            ? formRegisterAction('productDescription')
            : { name: 'productDescription' })}
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
          defaultValue={defaultValues?.price}
          aria-invalid={Boolean(clientFormErrors?.price || fieldErrors?.price)}
          aria-describedby='product-price-error'
          {...(formRegisterAction
            ? formRegisterAction('price')
            : { name: 'price' })}
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
          defaultValue={defaultValues?.stock}
          aria-invalid={Boolean(clientFormErrors?.stock || fieldErrors?.stock)}
          aria-describedby='product-stock-error'
          {...(formRegisterAction
            ? formRegisterAction('stock')
            : { name: 'stock' })}
        />
        {stockError && (
          <FieldDescription id='product-stock-error' variant='error'>
            {stockError}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor='product-category'>Category</FieldLabel>
        <Input
          id='product-category'
          type='text'
          placeholder='e.g. Electronics'
          defaultValue={defaultValues?.category}
          aria-invalid={Boolean(
            clientFormErrors?.category || fieldErrors?.category
          )}
          aria-describedby='product-category-error'
          {...(formRegisterAction
            ? formRegisterAction('category')
            : { name: 'category' })}
        />
        {categoryError && (
          <FieldDescription id='product-category-error' variant='error'>
            {categoryError}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor='images'>
          Product Images{' '}
          {isEdit && (
            <span className='text-slate-400 text-xs'>
              (leave empty to keep existing)
            </span>
          )}
        </FieldLabel>
        <Input
          id='images'
          name='images'
          type='file'
          multiple
          accept='image/*'
          aria-invalid={Boolean(fieldErrors?.images)}
          aria-describedby='images-error'
        />
        {fieldErrors?.images && (
          <FieldDescription id='images-error' variant='error'>
            {fieldErrors.images}
          </FieldDescription>
        )}
      </Field>
    </>
  );
}
