const axios = require('axios');
const moment = require('moment');

const dateToday = moment().subtract(1, 'days').format('YYYYMMDD');
const datePrevious = moment().subtract(3, 'days').format('YYYYMMDD');

const fetchData = async (date) => {
	try {
		const { data } = await axios.get(
			`https://covidtracking.com/api/v1/states/${date}.json`
		);
		return data;
	} catch (error) {
		console.error(error);
	}
};

const calculateNewDeaths = (todayData, oldData) => {
	return todayData.map((item, index) => ({
		state: item.state,
		deaths: item.death - oldData[index].death,
	}));
};

const aggregateData = (todayData, newDeathsData) => {
	return todayData.map((item, index) => ({
		state: item.state,
		hospitalizedCurrently: item.hospitalizedCurrently || 0,
		deaths: newDeathsData[index].deaths,
	}));
};

const getCovidData = async () => {
	const todayData = await fetchData(dateToday);
	const previousData = await fetchData(datePrevious);
	const newDeathsData = calculateNewDeaths(todayData, previousData);

	return aggregateData(todayData, newDeathsData);
};

module.exports = { getCovidData, calculateNewDeaths, aggregateData };
