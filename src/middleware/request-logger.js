/**
 * @description Logs requests' data sent to an API route
 *
 * @param req
 * @param res
 * @param next
 */
const requestLogger = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.info(
    'Received request:',
    `${JSON.stringify({
      timestamp: Date.now(),
      url: req.originalUrl,
      payload: req.body,
      headers: req.rawHeaders,
      method: req.method,
    })}\n`,
  );
  next();
};

export default requestLogger;
