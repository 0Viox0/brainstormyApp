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
    accountProvider: string;
  }): UserDto {
    const { name, profilePictureUrl, ...goodPart } = user;

    return {
      ...goodPart,
      username: name,
      userLogoUrl: profilePictureUrl,
    };
  }

  toUserModel(userDto: UserDto, isNew: boolean): UserModel {
    return {
      username: userDto.username,
      tokensLeft: userDto.tokensLeft,
      userLogoUrl: userDto.userLogoUrl,
      accountProvider: userDto.accountProvider,
      isNew: isNew,
    };
  }
}
