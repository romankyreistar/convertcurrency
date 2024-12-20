import axios from 'axios';
import { API_URL } from '../config/api.js';

const history = [];

export const getConversionRate = async (fromCurrency, toCurrency, amount) => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      base: fromCurrency,
      symbols: toCurrency,
    },
  });

  const rate = response.data.conversion_rates[toCurrency];
  if (!rate) throw new Error('Invalid currency code');

  const convertedAmount = amount * rate;

  const conversionRecord = {
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount,
    exchangeRate: rate,
    timestamp: new Date().toISOString(),
  };
  history.push(conversionRecord);

  return conversionRecord;
};

export const getConversionHistory = () => {
  return history;
};
