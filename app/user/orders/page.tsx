import { getUserByAuth0Id, getUserOrders } from '@/app/services/data';
import { TypographyH1 } from '@/components/ui/h1';
import { auth0 } from '@/lib/auth0';
import { formatMoney } from '@/lib/utils';

export default async function UserOrdersPage() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main className='min-h-dvh flex items-center justify-center text-center'>
        <TypographyH1>
          Welcome! Please log in to see your profile page.
        </TypographyH1>
      </main>
    );
  }
  const user = session.user;
  const dbUser = await getUserByAuth0Id(user.sub!);

  if (!dbUser) {
    return (
      <main className='min-h-dvh flex items-center justify-center text-center'>
        <TypographyH1>Something went wrong loading your orders.</TypographyH1>
      </main>
    );
  }

  const orders = await getUserOrders(dbUser.id);

  return (
    <div className='flex flex-col mx-auto py-10 px-4 font-sans'>
      <h1 className='text-center mb-8 text-2xl font-medium tracking-[-0.02em]'>
        My Orders
      </h1>
      <p className='mt-2 text-slate-500'>Orders currently stored in MongoDB.</p>

      <div className='mt-6 overflow-x-auto rounded-xl border bg-gray-100'>
        <table className='min-w-full text-sm'>
          <thead className='hidden md:table-header-group bg-white/5 text-gray-800'>
            <tr>
              <th className='text-left font-medium px-4 py-3'>Order ID</th>
              <th className='text-left font-medium px-4 py-3'>Date placed</th>
              <th className='text-left font-medium px-4 py-3'>Status</th>
              <th className='text-left font-medium px-4 py-3'>Items</th>
              <th className='text-left font-medium px-4 py-3'>Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr className='block md:table-row border-t border-white/10 text-gray-600'>
                <td className='px-4 py-4' colSpan={5}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className='block md:table-row mb-4 md:mb-0 rounded-lg md:rounded-none bg-white md:bg-transparent border md:border-0 border-gray-200 border-t md:border-t text-gray-600'
                  data-testid='order-row'
                >
                  <td
                    data-label='Order ID'
                    className='block md:table-cell px-4 py-2 md:py-3 before:content-[attr(data-label)] before:block before:text-xs before:font-medium before:text-gray-400 md:before:content-none'
                  >
                    {order.id}
                  </td>
                  <td
                    data-label='Date placed'
                    className='block md:table-cell px-4 py-2 md:py-3 before:content-[attr(data-label)] before:block before:text-xs before:font-medium before:text-gray-400 md:before:content-none'
                  >
                    {order.createdAt.toLocaleDateString()}
                  </td>
                  <td
                    data-label='Status'
                    className='block md:table-cell px-4 py-2 md:py-3 before:content-[attr(data-label)] before:block before:text-xs before:font-medium before:text-gray-400 md:before:content-none'
                  >
                    {order.status}
                  </td>
                  <td
                    data-label='Items'
                    className='block md:table-cell px-4 py-2 md:py-3 before:content-[attr(data-label)] before:block before:text-xs before:font-medium before:text-gray-400 md:before:content-none'
                  >
                    {order.orderItems.map((orderItem) => (
                      <div key={orderItem.id}>
                        {orderItem.product.productName} x {orderItem.quantity}
                      </div>
                    ))}
                  </td>
                  <td
                    data-label='Total'
                    className='block md:table-cell px-4 py-2 md:py-3 before:content-[attr(data-label)] before:block before:text-xs before:font-medium before:text-gray-400 md:before:content-none'
                  >
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
