import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({email, password});
    return this.repo.save(user);
  }

  // Returns one record or null
  findOne(userId: number) {
    return this.repo.findOneBy({
      id: userId
    });
  }

  // Returns an array with different records that match the
  // criteria. If no results, get back an empty array
  find(email: string) { // temp: users can have identical emais
    return this.repo.find({where: { email } })
  }

  // Partial type helper --> attrs that can be any object that has
  // at least OR none of the properties of the User entity
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if(!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs); // copy properties in attrs into user, overwriting any existing properties
    return this.repo.save(user);
  }

  async remove(id: number) {
     const user = await this.findOne(id);
     if(!user) {
       throw new NotFoundException('User not found');
     }
     return this.repo.remove(user);
  }
}
