export type UserFormState = {
  status: 'idle' | 'error' | 'success';
  message: string;
  fieldErrors: {
    firstname?: string | undefined;
    lastname?: string | undefined;
    phoneNumber?: string | undefined;
    address?: {
      line1: string | undefined;
      city: string | undefined;
      postalCode: string | undefined;
      country: string | undefined;
    };
  };
};

export const initialUserFormState: UserFormState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
};
