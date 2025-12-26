import { UserDto } from '../dto/user.dto';

export type RequestWithUser = Request & { user: UserDto };
