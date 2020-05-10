const axios = require('axios');
const moment = require('moment');

const todayDate = moment().format('YYYYMMDD') - 1;
const oldDate = todayDate - 2;

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
	const newDeaths = todayData.map((state, index) => ({
		state: state.state,
		deaths: state.death - oldData[index].death,
		/* 		deaths:
			state.death -
			oldData.find((oldState) => oldState.state === state.state).death, */
	}));
	return newDeaths;
};

const getNewCovidDeaths = async () => {
	const todayData = await getTodayData();
	const oldData = await getOldData();
	const newDeaths = calculateNewDeaths(todayData, oldData);
	return newDeaths;
};

module.exports = getNewCovidDeaths;
