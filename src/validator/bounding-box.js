import {
  LAT_LOWER_END, LAT_UPPER_END, LON_LOWER_END, LON_UPPER_END, MAX_BOX_SIZE,
} from '../constant/constants.js';

/**
 * @description checks if a value is within a range.
 *
 * @param value
 * @param lowerEnd
 * @param upperEnd
 * @returns {boolean}
 */
const inRange = (value, lowerEnd, upperEnd) => value >= lowerEnd && value <= upperEnd;

/**
 * @description validates bounding box values minLon and minLat must be
 * less than maxLon and maxLat respectively
 *
 * @param minLon
 * @param minLat
 * @param maxLon
 * @param maxLat
 * @returns {boolean}
 */
export const validBoundingBoxValues = (
  minLon,
  minLat,
  maxLon,
  maxLat,
) => parseFloat(minLon) <= parseFloat(maxLon) && parseFloat(minLat) <= parseFloat(maxLat);

/**
 * @description validates that the box size doesn't exceed the osm box size limit of 0.250000
 *
 * @param minLon
 * @param minLat
 * @param maxLon
 * @param maxLat
 * @returns {boolean}
 */
export const validBoundingBoxSize = (
  minLon,
  minLat,
  maxLon,
  maxLat,
) => Math.abs(maxLon - minLon) * Math.abs(maxLat - minLat) <= MAX_BOX_SIZE;

export const validBoundingBoxRange = (
  minLon,
  minLat,
  maxLon,
  maxLat,
) => inRange(minLon, LON_LOWER_END, LON_UPPER_END)
  && inRange(minLat, LAT_LOWER_END, LAT_UPPER_END)
  && inRange(maxLon, LON_LOWER_END, LON_UPPER_END)
  && inRange(maxLat, LAT_LOWER_END, LAT_UPPER_END);
