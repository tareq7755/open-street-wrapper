import getMapData from '../service/open-street-map.js';
import transform from '../transformer/osm-geojson-transformer.js';
import { ERROR_TOO_MANY_NODES, HTTP_BAD_REQUEST } from "../../constant/constants.js";

/**
 * Handle API calls to /maps
 *
 * @param req
 * @param res
 * @returns {Promise<JSON>}
 */
const getFeaturesHandler = async (req, res) => {
  const serviceResponse = await getMapData(req.query);

  const { data, error, status } = serviceResponse;

  if (error) {
    return res.status(error.response.status).send({ error: error.response.data });
  }

  if (status === HTTP_BAD_REQUEST) {
    return res.status(status).send({ error: ERROR_TOO_MANY_NODES });
  }

  const jsonData = await transform(data);

  return res.status(status).send({ data: jsonData });
};

export default getFeaturesHandler;
