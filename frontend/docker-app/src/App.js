import React, { useEffect, useState } from 'react';

function App() {
  const [rates, setRates] = useState({});
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/rates')  // Используем имя сервиса для подключения к бэкенду
      .then(response => response.json())
      .then(data => setRates(data))
      .catch(error => console.error("Failed to fetch rates:", error));
  }, []);


  const handleConvert = () => {
    fetch('http://127.0.0.1:5000/api/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, amount })
    })
      .then(response => response.json())
      .then(data => setConvertedAmount(data.convertedAmount))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <label>
          From:
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(rates).map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </label>
        <label>
          To:
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.keys(rates).map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button onClick={handleConvert}>Convert</button>
      </div>
      {convertedAmount !== null && (
        <p>Converted Amount: {convertedAmount} {to}</p>
      )}
    </div>
  );
}

export default App;
