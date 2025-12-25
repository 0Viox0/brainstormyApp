import { UserModel } from './user.model';

export class LoginModel {
  public user: UserModel;
  public jwtToken: string;
}
