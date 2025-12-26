import { UserModel } from 'src/user/models/user.model';

export class LoginModel {
  public user: UserModel;
  public jwtToken: string;
}
