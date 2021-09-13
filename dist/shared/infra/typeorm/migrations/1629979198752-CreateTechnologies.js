"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTechnologies1629979198752 = void 0;

var _typeorm = require("typeorm");

class CreateTechnologies1629979198752 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'technologies',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'start_date',
        type: 'timestamp'
      }, {
        name: 'type',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('technologies');
  }

}

exports.CreateTechnologies1629979198752 = CreateTechnologies1629979198752;