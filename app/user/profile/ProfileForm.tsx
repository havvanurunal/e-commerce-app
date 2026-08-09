'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { updateProfileAction } from './actions';

import { User } from '@prisma/client';
import { UpdateUserSchema } from '@/schemas/user';
import { UserFormFields } from './UserFormFields';
import { initialUserFormState } from '@/types/user';

export function ProfileForm({ user }: { user: User }) {
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    initialUserFormState
  );
  const router = useRouter();

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(UpdateUserSchema),
  });

  useEffect(() => {
    if (state.status === 'success') {
      setTimeout(() => {
        router.push('/user/profile');
      }, 2000);
    }
  }, [state.status, router]);

  if (isPending) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4'>
        <span>
          <Spinner data-icon='inline-start' /> Saving User Profile...
        </span>
      </div>
    );
  }

  if (state.status === 'success') {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4'>
        <h1 className='text-2xl font-bold mb-4'>
          User profile updated successfully!
        </h1>
        <p>Redirecting to user profile page...</p>
      </div>
    );
  }
  return (
    <form action={formAction}>
      <div className='flex flex-col max-w-xl mx-auto mt-10 gap-4'>
        <UserFormFields
          fieldErrors={state.fieldErrors ?? {}}
          formRegisterAction={register}
          clientFormErrors={errors}
          email={user.email}
          defaultValues={{
            firstname: user.firstname ?? undefined,
            lastname: user.lastname ?? undefined,
            phoneNumber: user.phoneNumber ?? undefined,
            address: user.address ?? undefined,
          }}
        />

        <div className='flex gap-2'>
          <Button variant='secondary' type='submit' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save User Profile'}
          </Button>
          <Button
            variant='secondary'
            type='button'
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
