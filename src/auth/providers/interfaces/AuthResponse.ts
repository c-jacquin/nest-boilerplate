import { Account } from '../../account';
import { User } from '../../user';

export interface AuthResponse {
  account: Account;
  user: User;
  providerToken: string;
}
