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

const invoke = async ({ cloudevent, lambdaArn }) => {
	const params = {
		FunctionName: lambdaArn,
		InvocationType: 'RequestResponse',
		Payload: JSON.stringify(cloudevent),
	}

	let status = null
	try {
		const res = await lambda.invoke(params).promise()
		status = res.StatusCode
	} catch (err) {
		status = err.statusCode
	}
	console.log(JSON.stringify({
		status: `${status}`,
		datetime: new Date().toISOString(),
		lambdaArn,
		cloudevent: {
			...cloudevent,
			data: 'hidden-by-lambda-hydrator',
		},
	}))
}

module.exports = { invoke }
