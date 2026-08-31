'use server';

import { getUserByAuth0Id, updateUserProfile } from '@/app/services/data';
import { requireUser } from '@/lib/authz';
import { UpdateUserSchema } from '@/schemas/user';
import { UserFormState } from '@/types/user';
import { revalidatePath } from 'next/cache';

export async function updateProfileAction(
  prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const user = await requireUser();
  const dbUser = await getUserByAuth0Id(user.sub!);

  if (!dbUser) {
    return {
      status: 'error',
      message: 'User not found',
      fieldErrors: {},
    };
  }

  const parsed = UpdateUserSchema.safeParse({
    firstname: formData.get('firstname'),
    lastname: formData.get('lastname'),
    phoneNumber: formData.get('phoneNumber'),
    address: {
      line1: formData.get('address.line1'),
      city: formData.get('address.city'),
      postalCode: formData.get('address.postalCode'),
      country: formData.get('address.country'),
    },
  });

  if (!parsed.success) {
    const errors = parsed.error.format();
    return {
      status: 'error',
      message: 'Please fix the errors below',
      fieldErrors: {
        firstname: errors.firstname?._errors[0],
        lastname: errors.lastname?._errors[0],
        phoneNumber: errors.phoneNumber?._errors[0],
        address: {
          line1: errors.address?.line1?._errors[0],
          city: errors.address?.city?._errors[0],
          postalCode: errors.address?.postalCode?._errors[0],
          country: errors.address?.country?._errors[0],
        },
      },
    };
  }

  try {
    await updateUserProfile(dbUser.id, {
      firstname: parsed.data.firstname,
      lastname: parsed.data.lastname,
      phoneNumber: parsed.data.phoneNumber,
      address: {
        line1: parsed.data.address.line1,
        city: parsed.data.address.city,
        postalCode: parsed.data.address.postalCode,
        country: parsed.data.address.country,
      },
    });

    revalidatePath('/user/profile');
    return {
      status: 'success',
      message: 'User profile updated successfully.',
      fieldErrors: {},
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('update profile failed:', errorMessage);
    return {
      status: 'error',
      message: `Could not update profile. ${errorMessage}`,
      fieldErrors: {},
    };
  }
}
