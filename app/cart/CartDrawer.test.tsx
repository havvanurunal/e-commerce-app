import { useCart } from './CartProvider';
import { render, fireEvent } from '@testing-library/react';
import { CartDrawer } from './CartDrawer';

jest.mock('./CartContents', () => () => <div />);

jest.mock('./CartProvider', () => ({
  useCart: jest.fn(),
}));

describe('CartDrawer', () => {
  it('shows if drawer closes when clicks on overlay', () => {
    const setIsOpenMock = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      isOpen: true,
      setIsOpen: setIsOpenMock,
    });
    const { getByTestId } = render(<CartDrawer cartItems={[]} />);
    const cartOverlay = getByTestId('cart-overlay');
    fireEvent.click(cartOverlay);
    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });
});
