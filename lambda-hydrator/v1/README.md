# ClickFlow lambda-hydrator v1 docker image

This image is a platform agnostic API Gateway to invoke AWS lambda functions purpose built to work within the CloudEvents + Rapids, Rivers, and Ponds software architecture in mind.

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
          AWS_SECRET_ACCESS_KEY: my-aws-key
          MAP_JSON: '{
            "my-cloudevent-type": "arn:aws:lambda:us-east-2:123456789012:function:my-function:1",
  "my-other-cloudevent-type": "arn:aws:lambda:us-east-2:123456789012:function:my-other-function:1",
  "add-google-authorization-token.0.o": "arn:aws:lambda:us-east-2:123456789012:function:add-authorization:1"
          }'
          NODE_ENV: development
          CLOUDEVENTS_PROTOCOL: kafka
          CLOUDEVENTS_URLS: river:9092
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
