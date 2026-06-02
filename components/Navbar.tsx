import Link from 'next/link';
import { getSessionUser, isAdmin } from '@/lib/authz';
import { User, LogOut, ShoppingCart, Package } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from './ui/button';

export default async function Navbar() {
  const user = await getSessionUser();
  const admin = isAdmin(user);

  return (
    <nav className='w-full px-30 py-2 bg-gray-100 flex items-center justify-between gap-2'>
      <Logo />

      <div className='flex'>
        {user && (
          <>
            <Link
              href='/user/profile'
              aria-label='user profile'
              className='p-2 rounded-md hover:bg-gray-100 '
            >
              <User className='size-6 text-gray-600' />
            </Link>

            {admin && (
              <Link
                href='/admin/products'
                aria-label='products'
                className='p-2 rounded-md hover:bg-gray-100'
              >
                <Package className='size-6 text-gray-600' />
              </Link>
            )}

            <Link
              href='/cart'
              aria-label='shopping cart'
              className='p-2 rounded-md hover:bg-gray-100'
            >
              <ShoppingCart className='size-6 text-gray-600' />
            </Link>

            <Link
              href='/auth/logout/'
              aria-label='log out'
              className='p-2 rounded-md hover:bg-gray-100'
            >
              <LogOut className='size-6 text-gray-600' />
            </Link>
          </>
        )}

        {!user && (
          <>
            <Button className='p-4 rounded-2xl mr-2' aria-label='sign up'>
              <Link href='/auth/login?screen_hint=signup'>Sign Up</Link>
            </Button>

            <Button className='p-4 rounded-2xl' aria-label='log in'>
              <Link href='/auth/login/'>Log In</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
