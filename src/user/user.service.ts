import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  private toUser(doc: {
    _id?: unknown;
    id?: unknown;
    email: string;
    password: string;
  }): User {
    return {
      id: String(doc.id ?? doc._id),
      email: doc.email,
      password: doc.password,
    };
  }

  async findAll(): Promise<User[]> {
    const docs: Array<{
      _id?: unknown;
      id?: unknown;
      email: string;
      password: string;
    }> = await this.userModel.find().lean().exec();
    return docs.map((d) => this.toUser(d));
  }

  async findById(id: string): Promise<User | null> {
    const d: {
      _id?: unknown;
      id?: unknown;
      email: string;
      password: string;
    } | null = await this.userModel.findById(id).lean().exec();
    if (!d) return null;
    return this.toUser(d);
  }
}
