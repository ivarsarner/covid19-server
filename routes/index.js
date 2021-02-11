const express = require('express');
const router = express.Router();
const { getCovidData } = require('../api/api');

router.get('/covid', async (req, res) => {
  try {
    const covidData = await getCovidData();
    console.log(covidData);
    res.json(covidData);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
