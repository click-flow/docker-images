const { invokeLambda } = require('./invoke-lambda')

const handler = ({ cloudevent, maps }) => {
	maps
	.filter(m => m.type === cloudevent.type)
	.forEach(m => invokeLambda({ cloudevent, arn: m.arn }))
}

module.exports = { handler }
