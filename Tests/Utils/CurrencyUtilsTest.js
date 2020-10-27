import { getSeparationOfFormatCurrency } from '../../App/Utils/CurrencyUtils';

describe('CurrencyUtils.js currency', () => {
  it('TestCurrencyUtils', () => {
    const {currencyValue,currencyInteger,currencyDecimal,currencyDecimalAndPoint} = getSeparationOfFormatCurrency({val:1234.56});
    expect(currencyValue).toBe('$1,234.56');
    expect(currencyInteger).toBe('1,234');
    expect(currencyDecimal).toBe('56');
    expect(currencyDecimalAndPoint).toBe('.56');
  });
});
