import axios from 'axios';
import getMapData from "../../../src/v1/service/open-street-map.js";

jest.mock('axios');

process.env.OPEN_STREET_MAP_URL = "http://some-url.com/map"
describe('getMapData', () => {
  it('should make correct request from passed params', async () => {
    const axiosSpy = jest.spyOn(axios, 'get')

    const queryParams = { minLon: "2.2945", minLat: "48.8584", maxLon: "2.2968", maxLat: "48.8600" };

    await getMapData(queryParams);

    expect(axiosSpy).toHaveBeenCalledWith(`${ process.env.OPEN_STREET_MAP_URL }?bbox=2.2945,48.8584,2.2968,48.8600`,
      expect.objectContaining({
        params: expect.objectContaining({}),
        validateStatus: expect.any(Function),
      })
    );
  });
});