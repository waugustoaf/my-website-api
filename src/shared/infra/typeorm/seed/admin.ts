import { BCryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import createConnection from '@shared/infra/typeorm';
import { v4 as uuid } from 'uuid';

const create = async () => {
  const connection = await createConnection();
  const bcryptHashProvider = new BCryptHashProvider();

  const id = uuid();
  const password = await bcryptHashProvider.generateHash('waugustoaf-admin');

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at) 
      VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()') `,
  );
};

create().then(() => console.log('Admin user has been created.'));
