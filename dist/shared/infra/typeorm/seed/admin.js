"use strict";

var _BCryptHashProvider = require("../../../container/providers/HashProvider/implementations/BCryptHashProvider");

var _ = _interopRequireDefault(require("./.."));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const create = async () => {
  const connection = await (0, _.default)();
  const bcryptHashProvider = new _BCryptHashProvider.BCryptHashProvider();
  const id = (0, _uuid.v4)();
  const password = await bcryptHashProvider.generateHash(String(process.env.ADMIN_PASSWORD));
  await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at) 
      VALUES('${id}', 'admin', 'admin@waugustoaf.com.br', '${password}', true, 'now()') `);
};

create().then(() => console.log('Admin user has been created.'));