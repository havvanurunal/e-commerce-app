import { getProductById } from '@/app/services/data';
import { EditProductForm } from '@/app/admin/products/[id]/edit/EditProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <div>
      <h1 className='text-2xl font-semibold tracking-[-0.02em]'>
        Edit Product
      </h1>
      <p className='mt-2 text-slate-300'>Update product information.</p>
      <EditProductForm product={product} />
    </div>
  );
}
