"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListTechnologiesUseCase = void 0;

var _ITechnologiesRepository = require("../../repositories/ITechnologiesRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let ListTechnologiesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('TechnologiesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ITechnologiesRepository.ITechnologiesRepository === "undefined" ? Object : _ITechnologiesRepository.ITechnologiesRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListTechnologiesUseCase {
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

  compare(a, b) {
    if (a.start_date < b.start_date) {
      return -1;
    }

    if (a.start_date > b.start_date) {
      return 1;
    }

    return 0;
  }

  async execute() {
    const response = await this.technologiesRepository.list();
    const technologies = response.map(technology => ({ ...technology,
      formatted_start_date: this.formatDate(technology.start_date)
    })).sort(this.compare);
    return technologies;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ListTechnologiesUseCase = ListTechnologiesUseCase;