import { Account } from '../../entities/account.entity';
import { User } from '../../entities/user.entity';

export interface AuthResponse {
  account: Account;
  user: User;
  providerToken: string;
}
