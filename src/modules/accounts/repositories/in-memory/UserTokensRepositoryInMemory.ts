import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { IUserTokensRepository } from '../IUserTokensRepository';

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  private userTokens: UserTokens[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, data);

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserTokens | undefined> {
    const userToken = this.userTokens.find(
      userToken => userToken.refresh_token === refresh_token,
    );

    return userToken;
  }

  async findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens | undefined> {
    const userToken = this.userTokens.find(
      userToken =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = await this.userTokens.findIndex(
      userToken => userToken.id === id,
    );

    this.userTokens.splice(userTokenIndex, 1);
  }
}
