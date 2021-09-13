"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async () => {
  const defaultOptions = await (0, _typeorm.getConnectionOptions)();
  return (0, _typeorm.createConnection)(Object.assign(defaultOptions, {
    database: process.env.NODE_END === 'test' ? 'waugustoaf_test' : defaultOptions.database
  }));
};

exports.default = _default;