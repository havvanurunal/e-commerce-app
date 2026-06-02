import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href='/'
      className='tracking-widest [font-variant:small-caps] underline underline-offset-4 decoration-1 text-gray-900 text-xl'
    >
      Maison
    </Link>
  );
}
