import getFeaturesRequestValidator from "../../src/middleware/request-validator.js";
import {
  HTTP_BAD_REQUEST, VALIDATION_INVALID_BOX_RANGE_MESSAGE,
  VALIDATION_INVALID_BOX_VALUES_MESSAGE,
  VALIDATION_INVALID_PARAMS_MESSAGE,
  VALIDATION_MAXIMUM_BOX_SIZE_EXCEEDED_MESSAGE
} from "../../src/constant/constants.js";

describe('getMapDataRequestValidator', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      query: {
        minLon: '1.000',
        minLat: '2.000',
        maxLon: '1.001',
        maxLat: '2.001',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    
    next = jest.fn();
  });

  it('should return bad request response with correct message when query params are missing', () => {
    const sendSpy = jest.spyOn(res, "send");
    const statusSpy = jest.spyOn(res, "status");

    req.query = {};

    getFeaturesRequestValidator(req, res, next);

    expect(statusSpy).toHaveBeenCalledWith(HTTP_BAD_REQUEST);
    expect(sendSpy).toHaveBeenCalledWith({
      error: VALIDATION_INVALID_PARAMS_MESSAGE,
      missingFields: ['minLon', 'minLat', 'maxLon', 'maxLat'],
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return bad request response with correct message if the bounding box values are out of range', () => {
    const sendSpy = jest.spyOn(res, "send");
    const statusSpy = jest.spyOn(res, "status");

    req.query = {
      minLon: '10001111.000',
      minLat: '2000111.000',
      maxLon: '1000111.001',
      maxLat: '200011.001',
    }

    getFeaturesRequestValidator(req, res, next);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(sendSpy).toHaveBeenCalledWith({ error: VALIDATION_INVALID_BOX_RANGE_MESSAGE });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return bad request response with correct message if the bounding box size exceeds limit', () => {
    const sendSpy = jest.spyOn(res, "send");
    const statusSpy = jest.spyOn(res, "status");

    req.query = {
      minLon: '-180',
      minLat: '-90',
      maxLon: '180',
      maxLat: '90',
    }

    getFeaturesRequestValidator(req, res, next);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(sendSpy).toHaveBeenCalledWith({ error: VALIDATION_MAXIMUM_BOX_SIZE_EXCEEDED_MESSAGE });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return bad request response with correct message if the bounding box values are invalid', () => {
    const sendSpy = jest.spyOn(res, "send");
    const statusSpy = jest.spyOn(res, "status");

    req.query = {
      minLon: '1.1',
      minLat: '1.1',
      maxLon: '1.0',
      maxLat: '1.0',
    }

    getFeaturesRequestValidator(req, res, next);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(sendSpy).toHaveBeenCalledWith({ error: VALIDATION_INVALID_BOX_VALUES_MESSAGE });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if validation is ok', () => {
    const sendSpy = jest.spyOn(res, "send");
    const statusSpy = jest.spyOn(res, "status");

    getFeaturesRequestValidator(req, res, next);

    expect(statusSpy).not.toHaveBeenCalled();
    expect(sendSpy).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
