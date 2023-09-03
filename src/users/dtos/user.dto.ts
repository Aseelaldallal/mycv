// Default way of showing user to outside world

import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}