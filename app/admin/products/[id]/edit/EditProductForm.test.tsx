import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Product } from '@prisma/client';
import { EditProductForm } from './EditProductForm';
import { initialProductFormState } from '@/types/products';

jest.mock('./actions', () => ({
  editProductAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(),
}));

function createMockProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: '483783489',
    productName: 'Mascara',
    productBrand: 'Maybeline',
    productDescription: 'Beauty product',
    price: 20.0,
    stock: 10,
    category: 'SKINCARE',
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    stripeProductId: '5648594',
    stripePriceId: '4747859',
    ...overrides,
  };
}

describe('EditProductForm', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows spinner when isPending is true', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      back: jest.fn(),
    });
    (useActionState as jest.Mock).mockReturnValue([
      initialProductFormState,
      jest.fn(),
      true,
    ]);
    const { getByText } = render(
      <EditProductForm product={createMockProduct()} />
    );
    expect(getByText('Updating Product...')).toBeInTheDocument();
  });
  it('shows success message', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      back: jest.fn(),
    });
    (useActionState as jest.Mock).mockReturnValue([
      { ...initialProductFormState, status: 'success' },
      jest.fn(),
      false,
    ]);
    const { getByText } = render(
      <EditProductForm product={createMockProduct()} />
    );
    expect(getByText('Product updated successfully!')).toBeInTheDocument();
    jest.advanceTimersByTime(2000);
    expect(pushMock).toHaveBeenCalledWith('/admin/products');
  });
  it('shows initial form', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      back: jest.fn(),
    });
    (useActionState as jest.Mock).mockReturnValue([
      initialProductFormState,
      jest.fn(),
      false,
    ]);
    const { getByText } = render(
      <EditProductForm product={createMockProduct()} />
    );
    expect(getByText('Update Product')).toBeInTheDocument();
  });
  it('calls router.back when Cancel is clicked', () => {
    const backMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      back: backMock,
    });
    (useActionState as jest.Mock).mockReturnValue([
      initialProductFormState,
      jest.fn(),
      false,
    ]);
    const { getByText } = render(
      <EditProductForm product={createMockProduct()} />
    );
    const cancel = getByText('Cancel');
    fireEvent.click(cancel);
    expect(backMock).toHaveBeenCalled();
  });
  it('shows error message', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      back: jest.fn(),
    });
    (useActionState as jest.Mock).mockReturnValue([
      {
        ...initialProductFormState,
        status: 'error',
        message: 'Something went wrong',
      },
      jest.fn(),
      false,
    ]);
    const { getByText } = render(
      <EditProductForm product={createMockProduct()} />
    );
    const errorMessage = getByText('Something went wrong');
    expect(errorMessage).toHaveClass('text-red-500');
  });
});
