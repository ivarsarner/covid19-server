const { calculateNewDeaths, aggregateData } = require('../api/api');
const todayDataMock = require('./mockData/todayDataMock.json');
const previousDataMock = require('./mockData/previousDataMock.json');
const newDeathsMock = require('./mockData/newDeathsMock.json');
const americanStatesMock = require('./mockData/americanStatesMock.json');

describe('The api functions', () => {
	test('calculateNewDeaths', () => {
		const expected = newDeathsMock;
		const result = calculateNewDeaths(todayDataMock, previousDataMock);
		expect(result).toStrictEqual(expected);
	});

	test('aggregateData', () => {
		const expected = americanStatesMock;
		const result = aggregateData(todayDataMock, newDeathsMock);
		expect(result).toStrictEqual(expected);
	});
});
