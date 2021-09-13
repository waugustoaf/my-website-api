"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTechnologyUseCase = void 0;

var _ITechnologiesRepository = require("../../repositories/ITechnologiesRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateTechnologyUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('TechnologiesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ITechnologiesRepository.ITechnologiesRepository === "undefined" ? Object : _ITechnologiesRepository.ITechnologiesRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateTechnologyUseCase {
  constructor(technologiesRepository, dayjsDateProvider) {
    this.technologiesRepository = technologiesRepository;
    this.dayjsDateProvider = dayjsDateProvider;
  }

  formatDate(date) {
    const dateNow = this.dayjsDateProvider.dateNow();
    const distanceYears = this.dayjsDateProvider.countTime({
      end_date: dateNow,
      start_date: date
    });
    const distanceMonths = this.dayjsDateProvider.countTime({
      end_date: dateNow,
      start_date: date,
      type: 'months'
    }) - distanceYears * 12;
    const formattedYears = distanceYears === 0 ? undefined : distanceYears === 1 ? '1 ano' : `${distanceYears} anos`;
    const formattedMonths = distanceMonths === 0 ? undefined : distanceMonths === 1 ? '1 mês' : `${distanceMonths} meses`;

    if (!!formattedMonths && !!formattedYears) {
      return `${formattedYears} e ${formattedMonths}`;
    } else {
      if (formattedYears) {
        return `${formattedYears}`;
      } else {
        return `${formattedMonths}`;
      }
    }
  }

  async execute({
    name,
    time_in_months,
    time_in_years,
    type
  }) {
    const technologyAlreadyExits = await this.technologiesRepository.findByName(name);

    if (technologyAlreadyExits && technologyAlreadyExits.type === type) {
      throw new _AppError.AppError('A technology with this name is already registered.');
    }

    if (type !== 'backend' && type !== 'mobile' && type !== 'web') {
      throw new _AppError.AppError(`Invalid technology type. Please check requirements at ${process.env.DOCS_URL}`);
    }

    if (time_in_months === 0 && time_in_years === 0) {
      throw new _AppError.AppError('You must have at least one month of technology experience.');
    }

    const start_date = this.dayjsDateProvider.backToDate({
      months: time_in_months,
      years: time_in_years
    });
    const formatted_start_date = this.formatDate(start_date);
    const technology = await this.technologiesRepository.create({
      name,
      start_date,
      type
    });
    return { ...technology,
      formatted_start_date
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateTechnologyUseCase = CreateTechnologyUseCase;