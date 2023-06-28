import {
  HTTP_BAD_REQUEST,
  VALIDATION_INVALID_BOX_VALUES_MESSAGE,
  VALIDATION_INVALID_PARAMS_MESSAGE,
  VALIDATION_MAXIMUM_BOX_SIZE_EXCEEDED_MESSAGE,
} from '../constant/constants.js';
import { validBoundingBoxSize, validBoundingBoxValues } from '../validator/bounding-box.js';

/**
 * @desc validates bounding box params
 *
 * @param req
 * @param res
 * @param next
 * @returns JSON response of validation errors, or moves on to the api handler
 */
const getFeaturesRequestValidator = (req, res, next) => {
  const requiredFields = ['minLon', 'minLat', 'maxLon', 'maxLat'];
  const missingFields = requiredFields.filter((field) => !req.query[field]);

  if (missingFields.length) {
    res.status(HTTP_BAD_REQUEST);
    return res.send({
      error: VALIDATION_INVALID_PARAMS_MESSAGE,
      missingFields,
    });
  }

  const {
    minLon, minLat, maxLon, maxLat,
  } = req.query;

  if (!validBoundingBoxSize(minLon, minLat, maxLon, maxLat)) {
    return res.status(400).send({ error: VALIDATION_MAXIMUM_BOX_SIZE_EXCEEDED_MESSAGE });
  }

  if (!validBoundingBoxValues(minLon, minLat, maxLon, maxLat)) {
    return res.status(400).send({ error: VALIDATION_INVALID_BOX_VALUES_MESSAGE });
  }

  return next();
};

export default getFeaturesRequestValidator;
