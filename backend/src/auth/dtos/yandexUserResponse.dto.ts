export class YandexUserResponseDto {
  public id: string;
  public login: string;
  public client_id: string;
  public display_name: string;
  public real_name: string;
  public first_name: string;
  public last_name: string;
  public sex: string;
  public default_email: string;
  public emails: string[];
  public default_avatar_id: string;
  public is_avatar_empty: boolean;
  public psuid: string;
}
