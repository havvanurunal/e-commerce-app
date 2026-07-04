import { fireEvent, render } from '@testing-library/react';
import { decrementQuantityAction, incrementQuantityAction } from './actions';
import QuantityControlsButtons from './QuantityControls';

jest.mock('./actions', () => ({
  incrementQuantityAction: jest.fn(),
  decrementQuantityAction: jest.fn(),
}));

describe('QuantityControlsButtons', () => {
  it('checks if - button is active when quantity > 1', () => {
    const { getByText } = render(
      <QuantityControlsButtons cartItemId='cart-test-id' quantity={2} />
    );
    const decrementQuantity = getByText('-');
    expect(decrementQuantity).not.toBeDisabled();
  });
  it('checks if - button is disabled when quantity <= 1', () => {
    const { getByText } = render(
      <QuantityControlsButtons cartItemId='cart-test-id' quantity={1} />
    );
    const decrementQuantity = getByText('-');
    expect(decrementQuantity).toBeDisabled();
  });
  it('checks if + button is cliecked incrementQuantityAction calls with right cartItemId', () => {
    const { getByText } = render(
      <QuantityControlsButtons cartItemId='cart-test-id' quantity={4} />
    );
    const incrementQuantity = getByText('+');
    fireEvent.click(incrementQuantity);
    expect(incrementQuantityAction).toHaveBeenCalledWith('cart-test-id');
  });
  it('checks if - button is cliecked decrementQuantityAction calls with right cartItemId', () => {
    const { getByText } = render(
      <QuantityControlsButtons cartItemId='cart-test-id' quantity={3} />
    );
    const decrementQuantity = getByText('-');
    fireEvent.click(decrementQuantity);
    expect(decrementQuantityAction).toHaveBeenCalledWith('cart-test-id');
  });
});
