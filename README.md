# OPEN STREET WRAPPER.
Uses open street map API to fetch features of Bounding box formatted coordinates.

## Technologies used
- `Docker`
- `Node 19`
- `NPM`
- `Jest` for testing and mocking.
- `EsLint` for coding standards - Airbnb style.
- `Express` for web routing.
- `osmtogeojson` to transform `osm` to `json`

## Run the app
Since this is a dockerized app, you don't need to install any dependencies, you just need to have docker installed.

- Clone the project.
- `cd` into the project directory.
- `docker build -t open-street-wrapper .` to build the image
- `docker run --name open-street-wrapper -it --rm -p 3000:3000 open-street-wrapper` to run the container.
- `docker stop open-street-wrapper` to stop the app once done.

## Tests and linting
- `docker run --rm -it -v "$(pwd)":/app -w /app node:19-alpine3.18 npm run test` to run the tests.
- `docker run --rm -it -v "$(pwd)":/app -w /app node:19-alpine3.18 npm run lint` to lint the code.


## API
The app exposes a single endpoint `/api/v1/features` which accepts the following query parameters:
- minLon
- minLat
- maxLon
- maxLat

## Validation
There are validators set in place to ensure only valid values are sent to the `osm API`

### Valid request example:
`curl "localhost:3000/api/v1/features?minLon=2.2945&minLat=48.8584&maxLon=2.2968&maxLat=48.8600"`