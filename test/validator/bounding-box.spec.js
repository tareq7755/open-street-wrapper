import { validBoundingBoxSize, validBoundingBoxValues } from "../../src/validator/bounding-box.js";
import { MAXIMUM_BOX_SIZE } from "../../src/constant/constants.js";


describe('Bounding Box Validator', () => {
  describe('validBoundingBoxValues', () => {
    it('should return true if minLon and minLat are less than or equal to maxLon and maxLat respectively', () => {
      expect(validBoundingBoxValues('0', '0', '1', '1')).toBe(true);
    });

    it('should return false if minLon is greater than maxLon', () => {
      expect(validBoundingBoxValues('2', '0', '1', '1')).toBe(false);
    });

    it('should return false if minLat is greater than maxLat', () => {
      expect(validBoundingBoxValues('0', '2', '1', '1')).toBe(false);
    });
  });

  describe('validBoundingBoxSize', () => {
    it('should return true if the box size does not exceed the maximum box size limit', () => {
      expect(validBoundingBoxSize('0', '0', '0.25', '0.25')).toBe(true);
    });

    it('should return false if the box size exceeds the maximum box size limit', () => {
      const maxLon = parseFloat(MAXIMUM_BOX_SIZE) + 1;
      const minLon = maxLon - 1;
      const maxLat = parseFloat(MAXIMUM_BOX_SIZE) + 1;
      const minLat = maxLat - 1;
      expect(validBoundingBoxSize(minLon.toString(), minLat.toString(), maxLon.toString(), maxLat.toString())).toBe(false);
    });
  });
});
