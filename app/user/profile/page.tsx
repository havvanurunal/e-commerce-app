import { TypographyH1 } from '@/components/ui/h1';
import { auth0 } from '@/lib/auth0';
import { getUserByAuth0Id } from '@/app/services/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Profile() {
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

  const dbUser = await getUserByAuth0Id(session.user.sub!);
  if (!dbUser) {
    return (
      <main className='min-h-dvh flex items-center justify-center text-center'>
        <TypographyH1>Something went wrong loading your profile.</TypographyH1>
      </main>
    );
  }

  const fields = [
    { label: 'Email', value: dbUser.email },
    { label: 'First name', value: dbUser.firstname },
    { label: 'Last name', value: dbUser.lastname },
    { label: 'Phone number', value: dbUser.phoneNumber },
    { label: 'Address line 1', value: dbUser.address?.line1 },
    { label: 'City', value: dbUser.address?.city },
    { label: 'Postal code', value: dbUser.address?.postalCode },
    { label: 'Country', value: dbUser.address?.country },
  ];

  return (
    <div className='max-w-xl mx-auto py-10 px-4'>
      <h1 className='text-2xl font-semibold tracking-[-0.02em] text-center mb-8'>
        My Profile
      </h1>

      <div className='rounded-xl border bg-gray-50 divide-y divide-gray-200'>
        {fields.map(({ label, value }) => (
          <div key={label} className='flex justify-between px-4 py-3 text-sm'>
            <span className='text-gray-500'>{label}</span>
            <span className='font-medium text-gray-900'>
              {value || <span className='text-gray-400 italic'>Not set</span>}
            </span>
          </div>
        ))}
      </div>

      <div className='mt-6 flex justify-center'>
        <Button asChild>
          <Link href='/user/profile/edit'>Edit Profile</Link>
        </Button>
      </div>
    </div>
  );
}
