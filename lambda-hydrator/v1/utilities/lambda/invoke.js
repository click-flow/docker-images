const AWS = require('aws-sdk')

const lambda = new AWS.Lambda({
	// required
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	apiVersion: "2015-03-31",
	region: process.env.AWS_REGION,
	secretAccessKey: process.env.AWS_SECRET_ACCRESS_KEY,

	// optional
	endpoint: process.env.AWS_ENDPOINT,
})

const invoke = ({ functionName, cloudevent }) => {
	const params = {
		FunctionName: functionName,
		InvocationType: 'Event',
		Payload: JSON.stringify({ cloudevent }),
	}
	lambda.invoke(params, (err, data) => {
		const datetime = new Date().toISOString()
		err
			? console.error(datetime, err, err.stack, cloudevent)
			: console.log(datetime, data, cloudevent)
	})
}

module.exports = { invoke }