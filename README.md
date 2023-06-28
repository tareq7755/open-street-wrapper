# OPEN STREET WRAPPER.
Uses open street map API to fetch features of [Bounding Box](https://wiki.openstreetmap.org/wiki/Bounding_Box) formatted coordinates.

## Technologies used
- `Docker`
- `Node 19`
- `NPM`
- `Jest` for testing and mocking.
- `EsLint` for coding standards - Airbnb style.
- `Express` for request routing.
- `osmtogeojson` to transform `osm` to `json`

## Run the app
Since this is a dockerized app, you don't need to install any dependencies, you just need to have docker installed.

- Clone the project.
- `cd` into the project directory.
- `docker build -t open-street-wrapper .` to build the image
- `docker run --name open-street-wrapper -it --rm -p 3000:3000 open-street-wrapper` to run the container.
- `docker stop open-street-wrapper` to stop the app once done.

## API
The app exposes a single endpoint `GET: /api/v1/features` which accepts the following query parameters:
- minLon
- minLat
- maxLon
- maxLat

These query parameters are then used to construct a Bounding box.

### Valid request example:
`curl "localhost:3000/api/v1/features?minLon=2.2945&minLat=48.8584&maxLon=2.2968&maxLat=48.8600"`

## Validation
There is a request validator middleware set in place to ensure only valid requests are sent to the `osm API`
- `minLon`, `minLat`, `maxLon`, `maxLat` must be passed in the request query params.
- `minLon` must be less than `maxLon`
- `minLat` must be less than `maxLat`
- Bounding box size must not exceed `0.250000`

## Testing and Linting
To run the tests and the linter, run the following commands
- `docker run --rm -it -v "$(pwd)":/app -w /app node:19-alpine3.18 npm install` to install node dependencies
- `docker run --rm -it -v "$(pwd)":/app -w /app node:19-alpine3.18 npm run test` to run the tests.
- `docker run --rm -it -v "$(pwd)":/app -w /app node:19-alpine3.18 npm run lint` to lint the code.

## Other Thoughts
- In my opinion, the response can be too large, I looked if osm `/map` API supports pagination, but it seems it does not.
- If this was for a production grade app, we might need to consider caching data, to avoid making so many requests to `osm` 