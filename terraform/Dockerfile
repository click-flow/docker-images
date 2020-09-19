FROM alpine:3

RUN apk update && apk add \
	git \
	unzip \
	wget

# Install terraform
ARG TERRAFORM_VERSION
RUN wget -O /tmp/terraform.zip https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_386.zip
RUN unzip /tmp/terraform.zip -d /usr/local/bin/
RUN rm /tmp/terraform.zip

RUN apk del \
	unzip \
	wget

WORKDIR /app

CMD [ "terraform", "--version" ]
