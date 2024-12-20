const BASE_URL = 'http://localhost:3000/api';

document
  .getElementById('currencyForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    document.getElementById('result').textContent = '';
    document.getElementById('exchangeRate').textContent = '';

    try {
      const response = await fetch(`${BASE_URL}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fromCurrency, toCurrency, amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to convert currency');
      }

      const data = await response.json();

      document.getElementById(
        'result'
      ).textContent = `Converted Amount: ${data.convertedAmount.toFixed(
        2
      )} ${toCurrency}`;
      document.getElementById(
        'exchangeRate'
      ).textContent = `Exchange Rate: 1 ${fromCurrency} = ${data.exchangeRate} ${toCurrency}`;

      fetchHistory();
    } catch (error) {
      document.getElementById('result').textContent = `Error: ${error.message}`;
    }
  });

const fetchHistory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/history`);

    if (!response.ok) {
      throw new Error('Failed to fetch conversion history');
    }

    const history = await response.json();
    renderHistory(history);
  } catch (error) {
    console.error('Error fetching history:', error.message);
  }
};

const renderHistory = (history) => {
  const historyContainer = document.getElementById('history');
  historyContainer.innerHTML = '';

  if (history.length === 0) {
    historyContainer.innerHTML = '<p>No conversion history available</p>';
    return;
  }

  history.forEach((record) => {
    const historyItem = document.createElement('div');
    historyItem.innerHTML = `
            <p>
                <strong>${record.timestamp}</strong>: ${record.amount} ${
      record.fromCurrency
    } 
                = ${record.convertedAmount.toFixed(2)} ${record.toCurrency} 
                (Rate: ${record.exchangeRate})
            </p>
        `;
    historyContainer.appendChild(historyItem);
  });
};

fetchHistory();
