import { NewProductForm } from '@/app/admin/products/new/NewProductForm';

export default function AdminNewProductPage() {
  return (
    <>
      <div className='mx-auto mt-10 text-center'>
        <h1 className='text-2xl font-semibold tracking-[-0.02em]'>
          Add a new product
        </h1>
        <p className='mt-2 text-slate-500'>
          Create a product with one or more images.
        </p>
      </div>
      <NewProductForm />
    </>
  );
}
