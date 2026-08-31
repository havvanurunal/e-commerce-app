import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { render } from '@testing-library/react';
import { NewProductForm } from './NewProductForm';
import { initialProductFormState } from '@/types/products';

jest.mock('./actions', () => ({
  createProductAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(),
}));

describe('NewProductForm', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows spinner when isPending is true', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useActionState as jest.Mock).mockReturnValue([
      initialProductFormState,
      jest.fn(),
      true,
    ]);
    const { getByText } = render(<NewProductForm />);
    expect(getByText('Saving Product...')).toBeInTheDocument();
  });
  it('shows success message', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    (useActionState as jest.Mock).mockReturnValue([
      { ...initialProductFormState, status: 'success' },
      jest.fn(),
      false,
    ]);
    const { getByText } = render(<NewProductForm />);
    expect(getByText('A new product added successfully!')).toBeInTheDocument();
    jest.advanceTimersByTime(2000);
    expect(pushMock).toHaveBeenCalledWith('/admin/products');
  });
  it('shows initial form', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useActionState as jest.Mock).mockReturnValue([
      initialProductFormState,
      jest.fn(),
      false,
    ]);
    const { getByText } = render(<NewProductForm />);
    expect(getByText('Save Product')).toBeInTheDocument();
  });
  it('shows error message', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
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
    const { getByText } = render(<NewProductForm />);
    const errorMessage = getByText('Something went wrong');
    expect(errorMessage).toHaveClass('text-red-500');
  });
});
