const axios = require('axios');
const moment = require('moment');

const dateToday = moment().subtract(2, 'days').format('YYYYMMDD');
const datePrevious = moment().subtract(4, 'days').format('YYYYMMDD');

const fetchData = async (date) => {
  console.log(date);
  const { data } = await axios.get(
    `https://api.covidtracking.com/v1/states/current.json`
  );
  return data;
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
