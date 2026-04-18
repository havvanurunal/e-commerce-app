import { getProducts } from '@/app/services/data';
import { formatMoney } from '@/lib/utils';
import Link from 'next/link';
import { DeleteProductButton } from '@/components/DeleteProductButton';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className='text-2xl font-semibold tracking-[-0.02em]'>Products</h1>
      <p className='mt-2 text-slate-500'>
        Products currently stored in MongoDB.
      </p>

      <div className='mt-6 overflow-x-auto rounded-xl border bg-gray-100'>
        <table className='min-w-full text-sm'>
          <thead className='bg-white/5 text-gray-800'>
            <tr>
              <th className='text-left font-medium px-4 py-3'>ID</th>
              <th className='text-left font-medium px-4 py-3'>Product Name</th>
              <th className='text-left font-medium px-4 py-3'>
                Product Description
              </th>
              <th className='text-left font-medium px-4 py-3'>Brand</th>
              <th className='text-left font-medium px-4 py-3'>Category</th>
              <th className='text-left font-medium px-4 py-3'>Price</th>
              <th className='text-left font-medium px-4 py-3'>Stock</th>
              <th className='text-left font-medium px-4 py-3'>Images</th>
              <th className='text-left font-medium px-4 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr className='border-t border-white/10 text-gray-600'>
                <td className='px-4 py-4' colSpan={8}>
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className='border-t border-gray-200 text-gray-600'
                >
                  <td className='px-4 py-3'>{product.id}</td>
                  <td className='px-4 py-3'>{product.productName}</td>
                  <td className='px-4 py-3'>{product.productDescription}</td>
                  <td className='px-4 py-3'>{product.productBrand}</td>
                  <td className='px-4 py-3'>{product.category}</td>
                  <td className='px-4 py-3'>{formatMoney(product.price)}</td>

                  <td className='px-4 py-3'>{product.stock}</td>
                  <td className='px-4 py-3'>{product.images.length}</td>
                  <td className='px-4 py-3'>
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className='text-blue-700 hover:underline'
                    >
                      Edit
                    </Link>

                    <DeleteProductButton id={product.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
