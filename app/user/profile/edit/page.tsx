import { TypographyH1 } from '@/components/ui/h1';
import { auth0 } from '@/lib/auth0';
import { getUserByAuth0Id } from '@/app/services/data';
import { ProfileForm } from '../ProfileForm';

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

  return (
    <div className='max-w-xl mx-auto py-10 px-4'>
      <h1 className='text-2xl font-semibold tracking-[-0.02em] text-center mb-8'>
        Edit Profile
      </h1>
      <ProfileForm user={dbUser} />
    </div>
  );
}
