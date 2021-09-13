"use strict";

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _UserTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UserTokensRepository");

var _ProjectsRepository = require("../../modules/projects/infra/typeorm/repositories/ProjectsRepository");

var _TechnologiesRepository = require("../../modules/technologies/infra/typeorm/repositories/TechnologiesRepository");

var _tsyringe = require("tsyringe");

require("./providers");

_tsyringe.container.registerSingleton('TechnologiesRepository', _TechnologiesRepository.TechnologiesRepository);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.UserTokensRepository);

_tsyringe.container.registerSingleton('ProjectsRepository', _ProjectsRepository.ProjectsRepository);