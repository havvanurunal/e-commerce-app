'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { UpdateUserSchema } from '@/schemas/user';
import z from 'zod';

type FormInput = z.infer<typeof UpdateUserSchema>;

type UserFormFieldsProps = {
  email: string;
  fieldErrors: {
    firstname?: string;
    lastname?: string;
    phoneNumber?: string;
    address?: {
      line1?: string;
      city?: string;
      postalCode?: string;
      country?: string;
    };
  };
  defaultValues?: Partial<FormInput>;
  formRegisterAction?: UseFormRegister<FormInput>;
  clientFormErrors?: FieldErrors<FormInput>;
  isEdit?: boolean;
};

export function UserFormFields({
  email,
  fieldErrors,
  defaultValues,
  formRegisterAction,
  clientFormErrors,
  isEdit = false,
}: UserFormFieldsProps) {
  const firstname =
    clientFormErrors?.firstname?.message || fieldErrors?.firstname;
  const lastname = clientFormErrors?.lastname?.message || fieldErrors?.lastname;
  const phoneNumber =
    clientFormErrors?.phoneNumber?.message || fieldErrors?.phoneNumber;
  const addressLine1 =
    clientFormErrors?.address?.line1?.message || fieldErrors?.address?.line1;
  const addressCity =
    clientFormErrors?.address?.city?.message || fieldErrors?.address?.city;
  const addressPostalCode =
    clientFormErrors?.address?.postalCode?.message ||
    fieldErrors?.address?.postalCode;
  const addressCountry =
    clientFormErrors?.address?.country?.message ||
    fieldErrors?.address?.country;
  return (
    <>
      <Field>
        <FieldLabel htmlFor='email'>Email</FieldLabel>
        <Input id='email' type='email' value={email ?? ''} disabled readOnly />
      </Field>

      <Field>
        <FieldLabel htmlFor='firstname'>Firstname</FieldLabel>
        <Input
          id='firstname'
          type='text'
          placeholder='Firstname'
          defaultValue={defaultValues?.firstname}
          aria-invalid={Boolean(
            clientFormErrors?.firstname || fieldErrors?.firstname
          )}
          aria-describedby='firstname-error'
          {...(formRegisterAction
            ? formRegisterAction('firstname')
            : { name: 'firstname' })}
        />
        {firstname && (
          <FieldDescription id='firstname-error' variant='error'>
            {firstname}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor='lastname'>Lastname</FieldLabel>
        <Input
          id='lastname'
          type='text'
          placeholder='Lastname'
          defaultValue={defaultValues?.lastname}
          aria-invalid={Boolean(
            clientFormErrors?.lastname || fieldErrors?.lastname
          )}
          aria-describedby='lastname-error'
          {...(formRegisterAction
            ? formRegisterAction('lastname')
            : { name: 'lastname' })}
        />
        {lastname && (
          <FieldDescription id='lastname-error' variant='error'>
            {lastname}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor='phoneNumber'>Phone Number</FieldLabel>
        <Input
          id='phoneNumber'
          type='text'
          placeholder='Phone Number'
          defaultValue={defaultValues?.phoneNumber}
          aria-invalid={Boolean(
            clientFormErrors?.phoneNumber || fieldErrors?.phoneNumber
          )}
          aria-describedby='phoneNumber-error'
          {...(formRegisterAction
            ? formRegisterAction('phoneNumber')
            : { name: 'phoneNumber' })}
        />
        {phoneNumber && (
          <FieldDescription id='phoneNumber-error' variant='error'>
            {phoneNumber}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor='addressLine1'>Line 1</FieldLabel>
        <Input
          id='addressLine1'
          type='text'
          placeholder='Address Line 1'
          defaultValue={defaultValues?.address?.line1}
          aria-invalid={Boolean(
            clientFormErrors?.address?.line1 || fieldErrors?.address?.line1
          )}
          aria-describedby='addressLine1-error'
          {...(formRegisterAction
            ? formRegisterAction('address.line1')
            : { name: 'addressLine1' })}
        />
        {addressLine1 && (
          <FieldDescription id='addressLine1-error' variant='error'>
            {addressLine1}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor='addressCity'>City</FieldLabel>
        <Input
          id='addressCity'
          type='text'
          placeholder='City'
          defaultValue={defaultValues?.address?.city}
          aria-invalid={Boolean(
            clientFormErrors?.address?.city || fieldErrors?.address?.city
          )}
          aria-describedby='addressCity-error'
          {...(formRegisterAction
            ? formRegisterAction('address.city')
            : { name: 'addressCity' })}
        />
        {addressCity && (
          <FieldDescription id='addressCity-error' variant='error'>
            {addressCity}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor='addressPostalCode'>Postal Code</FieldLabel>
        <Input
          id='addressPostalCode'
          type='text'
          placeholder='Postal Code'
          defaultValue={defaultValues?.address?.postalCode}
          aria-invalid={Boolean(
            clientFormErrors?.address?.postalCode ||
              fieldErrors?.address?.postalCode
          )}
          aria-describedby='addressPostalCode-error'
          {...(formRegisterAction
            ? formRegisterAction('address.postalCode')
            : { name: 'addressPostalCode' })}
        />
        {addressPostalCode && (
          <FieldDescription id='addressPostalCode-error' variant='error'>
            {addressPostalCode}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor='addressCountry'>Country</FieldLabel>
        <Input
          id='addressCountry'
          type='text'
          placeholder='Country'
          defaultValue={defaultValues?.address?.country}
          aria-invalid={Boolean(
            clientFormErrors?.address?.country || fieldErrors?.address?.country
          )}
          aria-describedby='addressCountry-error'
          {...(formRegisterAction
            ? formRegisterAction('address.country')
            : { name: 'addressCountry' })}
        />
        {addressCountry && (
          <FieldDescription id='addressCountry-error' variant='error'>
            {addressCountry}
          </FieldDescription>
        )}
      </Field>
    </>
  );
}
