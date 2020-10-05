const { invoke } = require('./utilities/lambda/invoke')
const { v4: { createEventStream } } = require('@1mill/cloudevents')

const river = createEventStream({
	id: process.env.CLOUDEVENTS_ID,
	mechanism: process.env.CLOUDEVENTS_MECHANISM,
	password: process.env.CLOUDEVENTS_PASSWORD,
	protocol: process.env.CLOUDEVENTS_PROTOCOL,
	urls: (process.env.CLOUDEVENTS_URLS || '').split(','),
	username: process.env.CLOUDEVENTS_USERNAME,
})

const MAP = JSON.parse(process.env.MAP_JSON)
river.listen({
	handler: async ({ cloudevent }) => {
		const functionName = MAP[cloudevent.type]
		invoke({ cloudevent, functionName })
	},
	types: Object.keys(MAP)
})
