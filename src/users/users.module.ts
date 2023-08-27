import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])], // This creates our repository for us
})
export class UsersModule {}
