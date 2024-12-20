export const validateCurrencyInput = (req, res, next) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  if (!fromCurrency || !toCurrency || !amount) {
    return res.status(400).json({
      error: 'Missing required fields: fromCurrency, toCurrency, amount',
    });
  }

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  next();
};
