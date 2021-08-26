import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IHashProvider } from './HashProvider/IHashProvider';
import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

container.registerSingleton<IHashProvider>(
  'BCryptHashProvider',
  BCryptHashProvider,
);
