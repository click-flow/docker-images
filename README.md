# Public ClickFlow Docker Images

## Publish images

1. Log into docker.pkg.github.com

    ```bash
    docker login --username ${MY_GITHUB_EMAIL} --password ${MY_GITHUB_ACCESS_TOKEN}
    ```

1. Build and publish images

    ```bash
    docker-comopse build && docker-compose push
    ```
