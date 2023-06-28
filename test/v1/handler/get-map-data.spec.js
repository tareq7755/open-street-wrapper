jest.mock("../../../src/v1/service/open-street-map.js");
jest.mock("../../../src/v1/transformer/osm-geojson-transformer.js");

import getFeaturesHandler from "../../../src/v1/handler/get-features.js";
import getMapData from "../../../src/v1/service/open-street-map.js";
import transform from "../../../src/v1/transformer/osm-geojson-transformer.js";

const mockOsmResponse = {
  "data": {
    "version": "0.6",
    "bounds": {
      "minlat": 48.8584,
      "minlon": 2.2945,
      "maxlat": 48.86,
      "maxlon": 2.2968
    },
    elements: [
      {
        "type": "node",
        "id": 368286
      }
    ]
  }
}

const mockTransformedData = { type: "FeatureCollection", features: [{ type: "feature", id: "368286" }] };

describe('getMapDataHandler', () => {
  it('should return transformed JSON data on successful response', async () => {
    const req = { query: { minLon: 2.2945, minLat: 48.8584, maxLon: 2.2968, maxLat: 48.8600 } };

    const mockServiceResponse = { mockOsmResponse, error: null, status: 200 };

    getMapData.mockImplementation(() => mockServiceResponse);
    transform.mockImplementation(() => mockTransformedData);

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockImplementation((response) => response),
    };

    await getFeaturesHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ data: mockTransformedData });
  });

  it('should return error response on unsuccessful service response', async () => {
    const req = { query: {} };
    const error = { response: { status: 500, data: 'Internal Server Error' } };
    const mockServiceResponse = { data: null, error, status: 500 };

    getMapData.mockResolvedValue(mockServiceResponse);

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockImplementation((response) => response),
    };

    await getFeaturesHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
