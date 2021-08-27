import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens | undefined>;
  findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens | undefined>;
  deleteById(id: string): Promise<void>;
}