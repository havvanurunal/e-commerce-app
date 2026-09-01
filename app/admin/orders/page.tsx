import { getAllOrders } from '@/app/services/data';
import { formatMoney } from '@/lib/utils';

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();
  return (
    <div>
      <h1 className='text-2xl font-semibold tracking-[-0.02em]'>Orders</h1>
      <p className='mt-2 text-slate-500'>Orders currently stored in MongoDB.</p>

      <div className='mt-6 overflow-x-auto rounded-xl border bg-gray-100'>
        <table className='min-w-full text-sm'>
          <thead className='bg-white/5 text-gray-800'>
            <tr>
              <th className='text-left font-medium px-4 py-3'>Order ID</th>
              <th className='text-left font-medium px-4 py-3'>Customer</th>
              <th className='text-left font-medium px-4 py-3'>Date placed</th>
              <th className='text-left font-medium px-4 py-3'>Status</th>
              <th className='text-left font-medium px-4 py-3'>Items</th>
              <th className='text-left font-medium px-4 py-3'>Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr className='border-t border-white/10 text-gray-600'>
                <td className='px-4 py-4' colSpan={6}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className='border-t border-gray-200 text-gray-600'
                  data-testid='order-row'
                >
                  <td className='px-4 py-3'>{order.id}</td>
                  <td className='px-4 py-3'>{order.user.email}</td>
                  <td className='px-4 py-3'>
                    {order.createdAt.toLocaleDateString()}
                  </td>
                  <td className='px-4 py-3'>{order.status}</td>
                  <td className='px-4 py-3'>
                    {order.orderItems.map((orderItem) => (
                      <div key={orderItem.id}>
                        {orderItem.product.productName} x {orderItem.quantity}
                      </div>
                    ))}
                  </td>
                  <td className='px-4 py-3'>
                    {formatMoney(
                      order.orderItems.reduce(
                        (sum, orderItem) =>
                          sum + orderItem.price * orderItem.quantity,
                        0
                      )
                    )}
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
