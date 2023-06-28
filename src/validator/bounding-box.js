import { MAXIMUM_BOX_SIZE } from '../constant/constants.js';

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
) => Math.abs(maxLon - minLon) * Math.abs(maxLat - minLat) <= MAXIMUM_BOX_SIZE;
