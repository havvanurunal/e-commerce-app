import { formatMoney } from './utils';

describe('formatMoney', () => {
  it('format USD ', () => {
    const result = formatMoney(1, 'USD', 'en-US');
    expect(result).toMatch('$1.00');
  });
});
