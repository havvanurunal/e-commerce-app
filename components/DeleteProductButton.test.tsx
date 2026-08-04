import { deleteProductAction } from '@/app/admin/products/actions';
import { DeleteProductButton } from './DeleteProductButton';
import { fireEvent, render } from '@testing-library/react';

jest.mock('@/app/admin/products/actions', () => ({
  deleteProductAction: jest.fn(),
}));

describe('DeleteProductButton', () => {
  it('deletes the product from admin product page', () => {
    const { getByText } = render(<DeleteProductButton id='test-product-id' />);
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);
    expect(deleteProductAction).toHaveBeenCalledWith('test-product-id');
  });
});
