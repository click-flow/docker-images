const AWS = require('aws-sdk')

const lambda = new AWS.Lambda({
	// required
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	apiVersion: '2015-03-31',
	region: process.env.AWS_REGION,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

	// optional
	endpoint: process.env.AWS_ENDPOINT,
})

const invoke = async ({ lambdaArn, cloudevent }) => {
	const params = {
		FunctionName: lambdaArn,
		InvocationType: 'Event',
		Payload: JSON.stringify(cloudevent),
	}
	await lambda.invokeAsync(params, (err, data) => {
		console.log({
			datetime: new Date().toISOString(),
			lambdaArn,
			cloudevent,
			response: err || data,
		})
	})
}

module.exports = { invoke }
