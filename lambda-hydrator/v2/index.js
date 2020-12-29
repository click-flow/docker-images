const { invoke } = require('./utilities/lambda/invoke')
const { v4: { createEventStream } } = require('@1mill/cloudevents')

const stream = createEventStream({
	id: process.env.CLOUDEVENTS_ID,
	mechanism: process.env.CLOUDEVENTS_MECHANISM,
	password: process.env.CLOUDEVENTS_PASSWORD,
	protocol: process.env.CLOUDEVENTS_PROTOCOL,
	urls: (process.env.CLOUDEVENTS_URLS || '').split(','),
	username: process.env.CLOUDEVENTS_USERNAME,
})

const MAPS = JSON.parse(process.env.MAPS_JSON || JSON.stringify([]))
const TYPES = [...new Set(MAPS.map(map => map.cloudeventType))]

const handler = async ({ cloudevent }) => {
	const promises = MAPS
		.filter(item => item.cloudeventType === cloudevent.type)
		.map(async item => await invoke({ lambdaArn: item.lambdaArn, cloudevent }))

	await Promise.allSettled(promises)
}
stream.listen({ handler, types: TYPES })
