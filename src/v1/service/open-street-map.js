import axios from 'axios';

/**
 * Fetches data from an endpoint
 *
 * @param url
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const fetchData = async (url, params) => axios.get(url, { params, validateStatus: () => true });

/**
 * Fetches open street map data
 *
 * @returns {Promise<axios.AxiosResponse<*>>}
 * @param params
 */
const getMapData = async (
  {
    minLon, minLat, maxLon, maxLat,
  },
) => fetchData(
  `${ process.env.OPEN_STREET_MAP_URL }?bbox=${ minLon },${ minLat },${ maxLon },${ maxLat }`,
  {},
);

export default getMapData;
