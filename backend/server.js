const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.75, JPY: 110 },
    EUR: { USD: 1.18, GBP: 0.88, JPY: 130 },
    GBP: { USD: 1.33, EUR: 1.14, JPY: 148 },
    JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0067 }
};

app.use(express.json());

app.get('/api/rates', (req, res) => {
    console.log("Exchange Rates:", exchangeRates);
    res.json(exchangeRates);
});

app.post('/api/convert', (req, res) => {
    const { from, to, amount } = req.body;
    const rate = exchangeRates[from]?.[to];
    if (rate) {
        const convertedAmount = amount * rate;
        res.json({ convertedAmount });
    } else {
        res.status(400).json({ error: "Conversion rate not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Exchange Rates:", exchangeRates);
});
