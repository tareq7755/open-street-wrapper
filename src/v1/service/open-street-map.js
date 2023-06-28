import axios from 'axios';

/**
 * @description Fetches data from an endpoint
 *
 * @param url
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const fetchData = async (url, params) => axios.get(url, { params, validateStatus: () => true });

/**
 * @description Fetches open street map data
 *
 * @param params
 * @returns {Promise<axios.AxiosResponse<*>>}
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
