import { render } from '@testing-library/react';
import { ProductFormFields } from './ProductFormFields';

describe('ProductFormFields', () => {
  it('shows productName field error when fieldErrors.productName is provided', () => {
    const mockRegister = jest.fn().mockReturnValue({});
    const { getByText } = render(
      <ProductFormFields
        formRegisterAction={mockRegister}
        fieldErrors={{
          productName: 'product-name-error',
        }}
      />
    );
    const productNameError = getByText('product-name-error');
    expect(productNameError).toBeInTheDocument();
  });

  it('checks if clientFormErrors appears before fieldErrors', () => {
    const mockRegister = jest.fn().mockReturnValue({});
    const { getByText, queryByText } = render(
      <ProductFormFields
        formRegisterAction={mockRegister}
        fieldErrors={{
          productName: 'server-error',
        }}
        clientFormErrors={{
          productName: {
            message: 'client-error',
            type: 'value',
          },
        }}
      />
    );
    const clientError = getByText('client-error');
    expect(clientError).toBeInTheDocument();
    const serverError = queryByText('server-error');
    expect(serverError).not.toBeInTheDocument();
  });

  it('shows leave empty to keep existing message if isEdit={true}', () => {
    const { getByText } = render(
      <ProductFormFields
        fieldErrors={{
          productName: 'product-name-error',
        }}
        isEdit={true}
      />
    );
    const message = getByText('(leave empty to keep existing)');
    expect(message).toBeInTheDocument();
  });

  it('shows no message if isEdit={false}', () => {
    const { queryByText } = render(
      <ProductFormFields
        fieldErrors={{
          productName: 'product-name-error',
        }}
        isEdit={false}
      />
    );
    const message = queryByText('(leave empty to keep existing)');
    expect(message).not.toBeInTheDocument();
  });
});
