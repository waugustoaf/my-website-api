"use strict";

require("../../container");

var _typeorm = _interopRequireDefault(require("../typeorm"));

var _celebrate = require("celebrate");

var _cors = _interopRequireDefault(require("cors"));

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

require("reflect-metadata");

var _AppError = require("../../errors/AppError");

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _typeorm.default)();
const app = (0, _express.default)();
app.use((0, _cors.default)({
  origin: process.env.ORIGIN_ALLOWED_URL
}));
app.use(_express.default.json());
app.use(_routes.routes);
app.use((0, _celebrate.errors)());
app.use((error, request, response, next) => {
  if (error instanceof _AppError.AppError) {
    return response.status(error.status).json({
      status: 'Error',
      message: error.message
    });
  } else {
    console.log(error);
    return response.status(500).json({
      status: 'Error',
      message: `INTERNAL SERVER ERROR (${error.message})`
    });
  }
});
app.listen(3333, () => {
  console.log('\x1b[32m', 'Server has started! 🚀');
});