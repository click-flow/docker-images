const { invoke } = require('./utilities/lambda/invoke')
const { v4: { createEventStream } } = require('@1mill/cloudevents')

const river = createEventStream({
	id: process.env.RIVER_CLOUDEVENTS_ID,
	mechanism: process.env.RIVER_CLOUDEVENTS_MECHANISM,
	password: process.env.RIVER_CLOUDEVENTS_PASSWORD,
	protocol: process.env.RIVER_CLOUDEVENTS_PROTOCOL,
	urls: (process.env.RIVER_CLOUDEVENTS_URLS || '').split(','),
	username: process.env.RIVER_CLOUDEVENTS_USERNAME,
})

const MAP = JSON.parse(process.env.MAP_JSON)
river.listen({
	handler: async ({ cloudevent }) => {
		const functionName = MAP[cloudevent.type]
		invoke({ cloudevent, functionName })
	},
	types: Object.keys(MAP)
})
