import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }
}
