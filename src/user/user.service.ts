import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.userRepo.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepo.find({});
  }

  async createUser(email: string, age: number): Promise<User> {
    return this.userRepo.create({
      userId: uuidv4(),
      email,
      age,
      favoriteFoods: [],
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.userRepo.findOneAndUpdate({ userId }, userUpdates);
  }
}
