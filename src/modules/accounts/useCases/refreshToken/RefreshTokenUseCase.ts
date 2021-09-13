import { authConfig } from '@config/auth';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { verify, sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<IResponse> {
    const {
      expires_in_refresh_token,
      secret_refresh_token,
      expires_refresh_token_days,
      expires_in_token,
      secret_token,
    } = authConfig;

    let email = '',
      sub = '';

    try {
      const { email: emailRegister, sub: subRegister } = verify(
        token,
        secret_refresh_token,
      ) as IPayload;

      email = emailRegister;
      sub = subRegister;
    } catch (err) {
      throw new AppError('Invalid Refresh Token');
    }

    const user_id = sub;

    const userToken = await this.userTokensRepository.findByUserAndRefreshToken(
      user_id,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });

    const expires_date = this.dayjsDateProvider.addFromNow({
      quantity: expires_refresh_token_days,
    });

    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}
