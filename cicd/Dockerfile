FROM alpine:3

RUN apk update && apk add \
	docker \
	git

RUN apk add --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community \
	'docker-compose>=1.26.2-r0'

WORKDIR /app

CMD [ "echo", "clickflow-cicd-image" ]
