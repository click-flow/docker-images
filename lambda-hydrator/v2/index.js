const { invoke } = require('./utilities/lambda/invoke')
const { v4: { createEventStream } } = require('@1mill/cloudevents');
const { ConfigurationOptions } = require('aws-sdk');

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
	const res = await Promise.all(
		MAPS
		.filter(map => map.cloudeventType === cloudevent.type )
		.map(map => handler({ lambdaArn: map.lambdaArn, cloudevent }))
	)
	console.log(res)

	// const functionName = MAP[cloudevent.type]
	// await invoke({ cloudevent, functionName })
}
// stream.listen({
// 	handler,
// 	types: TYPES,
// })

console.log(TYPES)

const temp = async () => {
	const cloudevent = {
		type: 'aaa'
	}
	await handler({ cloudevent })
}
temp()
