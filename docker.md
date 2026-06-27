1. Log in to Docker Hub:

```bash
docker login
```

Enter your Docker Hub username and password (or access token).

2. Check your local images:

```bash
docker images
```

Example:

```text
REPOSITORY    TAG       IMAGE ID
my-app        latest    abc123456789
```

3. Tag the image with your Docker Hub username:

Example:

```bash
docker tag my-app:latest shivam123/my-app:latest
```

4. Push the image:

```bash
docker push your-dockerhub-username/my-app:latest
```

Example:

```bash
docker push shivam123/my-app:latest
```