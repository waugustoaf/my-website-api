"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayjsDateProvider = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

class DayjsDateProvider {
  backToDate({
    months,
    years
  }) {
    let responseDate = (0, _dayjs.default)().toDate();

    if (months) {
      responseDate = (0, _dayjs.default)(responseDate).add(months * -1, 'months').toDate();
    }

    if (years) {
      responseDate = (0, _dayjs.default)(responseDate).add(years * -1, 'years').toDate();
    }

    return responseDate;
  }

  hasSameYear(first_date, second_date) {
    const isSame = (0, _dayjs.default)(first_date).diff(second_date, 'years') === 0;
    return isSame;
  }

  hasSameMonth(first_date, second_date) {
    const isSame = (0, _dayjs.default)(first_date).diff(second_date, 'months') === 0;
    return isSame;
  }

  dateNow() {
    const dateNow = (0, _dayjs.default)().toDate();
    return dateNow;
  }

  countTime({
    end_date,
    start_date,
    type = 'years'
  }) {
    const distance = (0, _dayjs.default)(end_date).diff(start_date, type);
    return distance;
  }

  addFromNow({
    quantity,
    type = 'days'
  }) {
    const response = (0, _dayjs.default)().add(quantity, type).toDate();
    return response;
  }

}

exports.DayjsDateProvider = DayjsDateProvider;