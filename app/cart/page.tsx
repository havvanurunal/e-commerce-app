import { requireUser } from '@/lib/authz';
import { getCartItems } from '../services/data';
import CartContents from './CartContents';

export default async function Cart() {
  const user = await requireUser();
  const cartItems = await getCartItems(user.sub!);
  return (
    <main className='min-h-screen flex px-6 py-6 relative overflow-hidden'>
      <CartContents cartItems={cartItems} />
    </main>
  );
}
