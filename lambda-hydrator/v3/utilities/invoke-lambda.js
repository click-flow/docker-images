const AWS = require('aws-sdk')

const lambda = new AWS.Lambda({
	// * required
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	apiVersion: process.env.AWS_API_VERSION,
	region: process.env.AWS_REGION,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

	// * optional
	endpoint: process.env.AWS_ENDPOINT,
})

const invokeLambda = ({ arn, cloudevent }) => {
	const params = {
		FunctionName: arn,
		InvocationType: 'RequestResponse',
		Payload: JSON.stringify(cloudevent),
	}
	let status = null
	lambda.invoke(params).promise()
		.then(res => status = res.StatusCode)
		.catch(err => status = err.statusCode)
		.finally(() => {
			const log = {
				arn,
				cloudevent: { ...cloudevent, data: '__hidden__' },
				datetime: new Date().toISOString(),
				status: `${status}`,
			}
			console.log(JSON.stringify(log))
		})
}

module.exports = { invokeLambda }
