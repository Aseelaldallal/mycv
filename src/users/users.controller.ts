import { Body, Controller, Get, Patch, Param, Query, Post, Delete, NotFoundException, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private userService: UsersService, private authService: AuthService) { }

    // @Get('/whoami')
    // whoAmI(@Session() session: any) {
    //   return this.userService.findOne(session.userId);
    // }

    @Get('/whoami')
    whoAmI(@CurrentUser() user: string) {
      return user;
    }

    @Post('/signout')
    signout(@Session() session: any) {
      session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) { // Nest will validate body of incoming request against dto
      const user = await this.authService.signup(body.email, body.password);
      session.userId = user.id;
      return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
      const user = await this.authService.signin(body.email, body.password); 
      session.userId = user.id;
      return user;
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) { // when we recieve request, every part of url is string
      const user = await this.userService.findOne(parseInt(id));
      if(!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
      return this.userService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
      return this.userService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
      return this.userService.remove(parseInt(id));
    }


}
