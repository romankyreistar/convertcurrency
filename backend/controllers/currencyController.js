import {
  getConversionRate,
  getConversionHistory,
} from '../services/currencyService.js';

export const convertCurrency = async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;
  try {
    const result = await getConversionRate(fromCurrency, toCurrency, amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHistory = (req, res) => {
  try {
    const history = getConversionHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
