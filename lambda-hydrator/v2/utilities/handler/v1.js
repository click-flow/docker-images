const { invoke } = require('../lambda/invoke/v1')

const handler = ({ cloudevent, maps }) => {
	maps
	.filter(map => map.cloudeventType === cloudevent.type)
	.forEach(map => invoke({ cloudevent, lambdaArn: map.lambdaArn }))
}

module.exports = { handler }
