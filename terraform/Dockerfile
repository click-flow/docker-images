FROM alpine:3

# Install terraform
ARG TERRAFORM_VERSION
RUN \
	apk update && \
	apk add git unzip wget && \
	wget -O /tmp/terraform.zip https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_386.zip && \
	unzip /tmp/terraform.zip -d /usr/local/bin/ && \
	rm /tmp/terraform.zip && \
	apk del unzip wget

WORKDIR /app

CMD [ "terraform", "--version" ]
