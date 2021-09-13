"use strict";

var _tsyringe = require("tsyringe");

var _DayjsDateProvider = require("./DateProvider/implementations/DayjsDateProvider");

var _BCryptHashProvider = require("./HashProvider/implementations/BCryptHashProvider");

_tsyringe.container.registerSingleton('DayjsDateProvider', _DayjsDateProvider.DayjsDateProvider);

_tsyringe.container.registerSingleton('BCryptHashProvider', _BCryptHashProvider.BCryptHashProvider);