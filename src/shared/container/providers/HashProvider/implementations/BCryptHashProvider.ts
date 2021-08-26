import { compare, hash } from 'bcrypt';
import { IHashProvider } from '../IHashProvider';

export class BCryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    const hashedPayload = await hash(payload, 8);

    return hashedPayload;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    const isSamePayload = await compare(payload, hashed);

    return isSamePayload;
  }
}
