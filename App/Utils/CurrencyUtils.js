import i18n from '../I18n';
// import i18n from 'i18n-js';

export const toFormatNumber = ({val, precision = 2})=>{
  return i18n.toNumber(val, { precision: precision });
};

export const toFormatCurrency = ({ val, precision = 2, unit = '$' }) => {
  return i18n.toCurrency(val, { precision: precision, unit });
};

export const getSeparationOfFormatCurrency = ({ val, precision = 2, unit = '$' }) => {
  const currencyValue = toFormatCurrency({ val, precision, unit }); // like $12,001.45
  const currencyInteger = currencyValue.slice(unit.length, currencyValue.length - precision - 1); // like 12,001
  const currencyDecimal = currencyValue.slice(currencyValue.length - precision); // like 45
  const currencyDecimalAndPoint = currencyValue.slice(currencyValue.length - precision - 1); // like .45
  return { unit, currencyValue, currencyInteger, currencyDecimal, currencyDecimalAndPoint };
};
