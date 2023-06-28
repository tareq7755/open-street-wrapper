import requestLogger from "../../src/middleware/request-logger.js";

const mockRes = () => ({
  status: () => {
  },
  send: () => {
  }
});

const mockReq = () => {
  return {
    originalUrl: "/api/v1/maps",
    rawHeaders: "headers",
    method: "GET"
  };
};

const mockNext = jest.fn(() => jest.fn(() => {
}));

describe("requestLogger", () => {
  it("logs request info", () => {
    const next = mockNext();
    const res = mockRes();
    const req = mockReq();

    Date.now = jest.fn(() => "1618594904856");
    const infoSpy = jest.spyOn(console, "info");
    requestLogger(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(infoSpy).toHaveBeenCalledWith(
      "Received request:",
      `${ JSON.stringify({
        timestamp: Date.now(),
        url: req.originalUrl,
        headers: req.rawHeaders,
        method: req.method
      }) }\n`
    );
  });
});