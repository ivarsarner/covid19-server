const axios = require('axios');
const moment = require('moment');

const todayDate = moment().subtract(1, 'days').format('YYYYMMDD');
const oldDate = moment().subtract(3, 'days').format('YYYYMMDD');

const getTodayData = async () => {
	const { data } = await axios.get(
		`https://covidtracking.com/api/v1/states/${todayDate}.json`
	);
	return data;
};

const getOldData = async () => {
	const { data } = await axios.get(
		`https://covidtracking.com/api/v1/states/${oldDate}.json`
	);
	return data;
};

const calculateNewDeaths = (todayData, oldData) => {
	return todayData.map((item, index) => ({
		state: item.state,
		deaths: item.death - oldData[index].death,
	}));
};

const getCovidData = async () => {
	const todayData = await getTodayData();
	const oldData = await getOldData();
	const newDeathsData = calculateNewDeaths(todayData, oldData);

	const covidData = todayData.map((item, index) => ({
		state: item.state,
		hospitalizedCurrently: item.hospitalizedCurrently || 0,
		deaths: newDeathsData[index].deaths,
	}));

	return covidData;
};

module.exports = getCovidData;
