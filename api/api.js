const axios = require('axios');

export const getCovidDeaths = async () => {
	const response = axios.get(
		'https://covidtracking.com/api/v1/states/current.json'
	);
};
