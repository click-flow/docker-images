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

const maps = JSON.parse(process.env.MAPS_JSON || JSON.stringify([]))

const types = [...new Set(maps.map(map => map.cloudeventType))]
const uniqueMaps = maps.filter((item1, i) => {
	const j = maps.findIndex(item2 => JSON.stringify(item1) === JSON.stringify(item2))
	return i === j
})

const handler = async ({ cloudevent }) => {
	const promises = uniqueMaps
		.filter(item => item.cloudeventType === cloudevent.type)
		.map(async item => await invoke({ lambdaArn: item.lambdaArn, cloudevent }))

	await Promise.allSettled(promises)
}
stream.listen({ handler, types })
