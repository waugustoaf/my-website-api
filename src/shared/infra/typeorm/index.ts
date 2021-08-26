import { createConnection, getConnectionOptions } from 'typeorm';

export default async () => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_END === 'test' ? 'waugustoaf_test' : defaultOptions.database,
    }),
  );
};