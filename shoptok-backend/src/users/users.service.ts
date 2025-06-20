import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(user: Partial<User>): Promise<User> {
    const newUser: User = {
      id: this.users.length + 1,
      username: user.username!,
      email: user.email!,
      passwordHash: user.passwordHash!,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }
}
