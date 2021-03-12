const axios = require('axios')

const API_TOKEN = process.env.API_KEY

const createClient = () => {
	return axios.create({
		baseURL: 'https://developer-apis.awair.is/v1',
		headers: { 'authorization': `Bearer ${API_TOKEN}` }
	});
}

const getUserDevices = async () => {
	const client = createClient()
	const resp = await client.get('/users/self/devices')

	return resp.data.devices[0]
}

module.exports = async () => {
	const client = createClient()
	const { deviceId, deviceType } = await getUserDevices()

	let airData;
	try {
		airData = await client.get(`/users/self/devices/${deviceType}/${deviceId}/air-data/latest?fahrenheit=false`)
	} catch (e) {
		console.log(e);
		throw new Error(e)
	}
	const resp = airData.data.data
	const { sensors, score } = resp[resp.length - 1]

	const roundToOne = (num) => {
		return Math.round(num * 10) / 10
	}

	const formattedData = {}

	sensors.forEach(e => {
		if (e.comp === 'humid') {
			formattedData.humidity = roundToOne(e.value)
		} else if (e.comp === 'temp') {
			formattedData[e.comp] = roundToOne(e.value)
		} else {
			formattedData[e.comp] = e.value
		}
	})

	return {
		overall: score,
		...formattedData
	}
}

