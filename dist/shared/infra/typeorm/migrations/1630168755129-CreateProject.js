"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProject1630168755129 = void 0;

var _typeorm = require("typeorm");

class CreateProject1630168755129 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'projects',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'external_link',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'github_link',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'image_link',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('projects');
  }

}

exports.CreateProject1630168755129 = CreateProject1630168755129;