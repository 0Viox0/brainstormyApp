import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserMapper {
  toDto(user: {
    id: string;
    name: string;
    profilePictureUrl: string;
    tokensLeft: number;
  }): UserDto {
    const { name, profilePictureUrl, ...goodPart } = user;

    return {
      ...goodPart,
      username: name,
      userLogoUrl: profilePictureUrl,
    };
  }

  toUserModel(userDto: UserDto): UserModel {
    return {
      username: userDto.username,
      tokensLeft: userDto.tokensLeft,
      userLogoUrl: userDto.userLogoUrl,
    };
  }
}
