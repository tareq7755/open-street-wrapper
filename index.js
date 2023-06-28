import express, { Router } from "express";

import requestLogger from "./src/middleware/request-logger.js";
import getFeaturesHandler from "./src/v1/handler/get-features.js";
import getFeaturesRequestValidator from "./src/middleware/request-validator.js";
import _ from "./src/util/env.js";

const router = Router();
const app = express();

app.use([express.json(), requestLogger]);

app.use("/api/v1", router.get("/features", getFeaturesRequestValidator, getFeaturesHandler));

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${ process.env.PORT }\n`);
});
