import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '@shared/container/providers/HashProvider/IHashProvider';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BCryptHashProvider')
    private bcryptHashProvider: IHashProvider,
  ) {}

  async execute({ email, name, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('An user with this email already exists.');
    }

    const hashedPassword = await this.bcryptHashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return classToClass(user);
  }
}
