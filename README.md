# Hello Welcome All
The Idea was to create a react frontend with a python fastapi backend.
working sample of app is found @ [https://griley.azurewebsites.net/](https://griley.azurewebsites.net/)

## DEV Helpful Scripts

### `cd frontend && npm run dev`
### `cd frontend && npm run backend`
### `cd backend && source venv/bin/activate`

#### `docker build -f Dockerfile.api -t griley-app-api .`
#### `docker tag "griley-app-api" grileycontainers.azurecr.io/griley-app-api:v1`
#### `docker push grileycontainers.azurecr.io/griley-app-api:v1`

#### `docker build -f Dockerfile.client -t griley-app-client .`
#### `docker tag "griley-app-client" grileycontainers.azurecr.io/griley-app-client:v1`
#### `docker push grileycontainers.azurecr.io/griley-app-client:v1`

