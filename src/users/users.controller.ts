import { Body, Controller, Get, Patch, Param, Query, Post, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';


@Controller('auth')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) { // Nest will validate body of incoming request against dto
      this.userService.create(body.email, body.password);
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
