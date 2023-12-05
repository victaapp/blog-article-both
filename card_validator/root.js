const express = require('express');
const utils = require('./utils');
const router = express.Router();

router.post('/submit', (req, res) => {
  const { cardNumber } = req.body;

  if (!cardNumber) {
    return res.status(400).json({ error: 'Card number is required.' });
  }

  // Check if the card number is valid using the Luhn algorithm
  const isValid = utils.luhnCheck(cardNumber);

  if (isValid) {
    res.json({ message: 'Card number is valid.' });
  } else {
    res.status(400).json({ error: 'Invalid card number.' });
  }
});

module.exports = router;
