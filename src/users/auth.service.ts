import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable() // Marking class for registration inside DI container
export class AuthService {

  constructor( private usersService: UsersService ) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);
    if(users.length) {
      throw new BadRequestException('Email in use');
    }

  }

  // Signin checks if user provided correct credentials
  // doesn't really "SIGN IN" user
  signin() {

  }

}