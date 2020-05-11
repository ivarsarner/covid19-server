const express = require('express');
const router = express.Router();
const getCovidData = require('../api/api');

router.get('/covid', async (req, res) => {
	const covidData = await getCovidData();
	res.json(covidData);
});

module.exports = router;
