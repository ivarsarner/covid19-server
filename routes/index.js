const express = require('express');
const router = express.Router();
const getNewCovidDeaths = require('../api/api');

router.get('/', async (req, res) => {
	const newCovidDeaths = await getNewCovidDeaths();
	res.json(newCovidDeaths);
});

module.exports = router;
