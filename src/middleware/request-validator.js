import {
  HTTP_BAD_REQUEST, VALIDATION_INVALID_BOX_RANGE_MESSAGE,
  VALIDATION_INVALID_BOX_VALUES_MESSAGE,
  VALIDATION_INVALID_PARAMS_MESSAGE,
  VALIDATION_MAXIMUM_BOX_SIZE_EXCEEDED_MESSAGE,
} from '../constant/constants.js';
import { validBoundingBoxRange, validBoundingBoxSize, validBoundingBoxValues } from '../validator/bounding-box.js';

const requiredFields = ['minLon', 'minLat', 'maxLon', 'maxLat'];

/**
 * @description validates bounding box params
 *
 * @param req
 * @param res
 * @param next
 * @returns JSON response of validation errors, or moves on to the api handler
 */
const getFeaturesRequestValidator = (req, res, next) => {
  const missingFields = requiredFields.filter(
    (field) => !req.query[field] || Number.isNaN(Number(req.query[field])),
  );

  if (missingFields.length) {
    return res.status(HTTP_BAD_REQUEST).send({
      error: VALIDATION_INVALID_PARAMS_MESSAGE, missingFields,
    });
  }

  const {
    minLon, minLat, maxLon, maxLat,
  } = req.query;

  if (!validBoundingBoxRange(minLon, minLat, maxLon, maxLat)) {
    return res.status(HTTP_BAD_REQUEST).send({ error: VALIDATION_INVALID_BOX_RANGE_MESSAGE });
  }

  if (!validBoundingBoxSize(minLon, minLat, maxLon, maxLat)) {
    return res.status(HTTP_BAD_REQUEST).send({
      error: VALIDATION_MAXIMUM_BOX_SIZE_EXCEEDED_MESSAGE,
    });
  }

  if (!validBoundingBoxValues(minLon, minLat, maxLon, maxLat)) {
    return res.status(HTTP_BAD_REQUEST).send({ error: VALIDATION_INVALID_BOX_VALUES_MESSAGE });
  }

  return next();
};

export default getFeaturesRequestValidator;
