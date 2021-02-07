const { handler }= require('./utilities/handler/v1')
const { v4: { createEventStream } } = require('@1mill/cloudevents')

const rawMaps = JSON.parse(process.env.MAPS_JSON || JSON.stringify([]))
const maps = rawMaps.filter((map1, i) => {
	const j = rawMaps.findIndex(map2 => JSON.stringify(map1) === JSON.stringify(map2))
	return i === j
})
const types = [...new Set(maps.map(map => map.cloudeventType))]

const stream = createEventStream({
	id: process.env.CLOUDEVENTS_ID,
	mechanism: process.env.CLOUDEVENTS_MECHANISM,
	password: process.env.CLOUDEVENTS_PASSWORD,
	protocol: process.env.CLOUDEVENTS_PROTOCOL,
	urls: (process.env.CLOUDEVENTS_URLS || '').split(','),
	username: process.env.CLOUDEVENTS_USERNAME,
})

stream.listen({
	handler: ({ cloudevent }) => handler({ cloudevent, maps }),
	types,
})
