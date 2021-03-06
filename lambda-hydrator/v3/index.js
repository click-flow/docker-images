const { handler } = require('./utilities/handler')
const { v5: { createCloudeventStream } } = require('@1mill/cloudevents');

// * Remove duplicate maps so we don't produce duplicate cloudevents via duplicate
// * listen calls to the cloudevent stream.
const maps = [
	...new Set(
		JSON.parse(process.env.ARN_AND_TYPE_MAPS_JSON).map(m => JSON.stringify(m))
	)
].map(m => JSON.parse(m))

// * Find unique cloudevent types that we should listen for on the cloudevent stream.
const types = [...new Set(maps.map(m => m.type))]

createCloudeventStream({}).listen({
	handler: ({ cloudevent }) => handler({ cloudevent, maps }),
	types,
})
