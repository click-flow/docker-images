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

const invoke = ({ cloudevent, lambdaArn }) => {
	const params = {
		FunctionName: lambdaArn,
		InvocationType: 'RequestResponse',
		Payload: JSON.stringify(cloudevent),
	}

	let status = null
	lambda.invoke(params).promise()
		.then(res => status = res.StatusCode)
		.catch(err => status = err.statusCode)
		.finally(() => {
			const log = {
				status: `${status}`,
				datetime: new Date().toISOString(),
				lambdaArn,
				cloudevent: { ...cloudevent, data: '__hidden__' },
			}
			console.log(JSON.stringify(log))
		})
}

module.exports = { invoke }
