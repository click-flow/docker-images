# ClickFlow lambda-hydrator docker image

This image is a platform agnostic API Gateway to invoke AWS lambda functions purpose built to work within the CloudEvents + Rapids, Rivers, and Ponds software architecture.

## Usage

Inside your docker-compose file

    ```yaml
    ...
    services:
      my-lambda-hydrator:
        image: docker.pkg.github.com/click-flow/docker-images/lambda-hydrator:v1-alpine
        environment:
          AWS_ACCESS_KEY_ID: my-aws-id
          AWS_REGION: us-east-1
          AWS_SECRET_ACCRESS_KEY: my-aws-key
          MAP_JSON: '{
            "my-first-cloudevent-type.0.o": "my-lambda-function-arn",
            "even-another-type.0.o": "do-this-thing-aws-arn",
            "some-other-type.0.o": "another-arn"
          }'
          NODE_ENV: development
          RIVER_CLOUDEVENTS_PROTOCOL: kafka
          RIVER_CLOUDEVENTS_URLS: river:9092
    ```

## Using localstack for local development

If you are using localstack to creat your functions locally on your computer, you want to do

    ```yaml
    ...
    localstack:
      image: localstack/localstack:0.11.5
      environment:
        DEBUG: 1
        LAMBDA_REMOTE_DOCKER: 0
        SERVICES: lambda
      volumes:
        - /var/run/docker.sock:/var/run/docker.sock

    lambda-hydrator:
      image: docker.pkg.github.com/click-flow/docker-images/lambda-hydrator:v1-alpine
      environment:
        AWS_ACCESS_KEY_ID: this-string-exists
        ...
        AWS_ENDPOINT: localstack:4566 # Connect to localstack
        NODE_TLS_REJECT_UNAUTHORIZED: 0 # Allow un-verified SSL connection
    ```