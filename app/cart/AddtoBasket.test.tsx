import { useRouter } from 'next/navigation';
import { useCart } from './CartProvider';
import AddtoBasket from './AddtoBasket';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { addToBasketAction } from './actions';

jest.mock('./actions', () => ({
  addToBasketAction: jest.fn().mockResolvedValue(undefined), // mockResolvedValue(): when the function is called, it returns resolved Promise. we used it for async
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('./CartProvider', () => ({
  useCart: jest.fn(),
}));

describe('AddtoBasket', () => {
  it('sends product to the basket and open the cart page', async () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 767,
      writable: true,
      configurable: true,
    });
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    (useCart as jest.Mock).mockReturnValue({
      setIsOpen: jest.fn(),
    });
    const { getByText } = render(<AddtoBasket productId='test-product-id' />);
    const addToBasket = getByText('Add to Basket');
    fireEvent.click(addToBasket);
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/cart')); // it waits till the async function runs. we check if push is called, because if push is called, addToBasketFunction is already called. instead of writing two waitFor(), we could ony wait for the last function running and make sure that everything is run.
    expect(addToBasketAction).toHaveBeenCalledWith('test-product-id');
  });
  it('shows cart on the right sidebar when clicked the button', async () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 769,
      writable: true,
      configurable: true,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    const setIsOpenMock = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      setIsOpen: setIsOpenMock,
    });
    const { getByText } = render(<AddtoBasket productId='test-product-id' />);
    const addToBasket = getByText('Add to Basket');
    fireEvent.click(addToBasket);
    await waitFor(() => expect(setIsOpenMock).toHaveBeenCalledWith(true)); // waitFor(callback) runs until callback doesn't return error
    expect(addToBasketAction).toHaveBeenCalledWith('test-product-id');
  });
});
