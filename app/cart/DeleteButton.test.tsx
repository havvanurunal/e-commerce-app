import { fireEvent, render } from '@testing-library/react';
import { removeFromCartAction } from './actions';
import DeleteButton from './DeleteButton';

jest.mock('./actions', () => ({
  removeFromCartAction: jest.fn(),
}));

describe('DeleteButton', () => {
  it('removes cartItem from the cart', () => {
    const { getByText } = render(<DeleteButton cartItemId='test-cart-id' />);
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);
    expect(removeFromCartAction).toHaveBeenCalledWith('test-cart-id');
  });
});
