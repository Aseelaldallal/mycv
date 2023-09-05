import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from 'crypto'; 
import { promisify } from 'util'; // Takes in a function that makes use of callbacks
// and gives us a version of that same functrion that returns a promise

// scrypt -- asynchronous
// we need to use callbacks
// we need to promisify it
const scrypt = promisify(_scrypt);

@Injectable() // Marking class for registration inside DI container
export class AuthService {

  constructor( private usersService: UsersService ) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);
    if(users.length) {
      throw new BadRequestException('Email in use');
    }

    const salt = randomBytes(8).toString('hex'); 
    const hash = await scrypt(password, salt, 32) as Buffer; 
    const result = salt + '.' + hash.toString('hex');
    const user = await this.usersService.create(email, result);
    return user;
  }

  // Signin checks if user provided correct credentials
  // doesn't really "SIGN IN" user
  signin() {

  }

}