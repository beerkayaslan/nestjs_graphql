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

  async findAll(page = 1, limit = 10): Promise<User[]> {
    const skip = (page - 1) * limit;

    return await this.userModel.find().skip(skip).limit(limit).exec();
  }
}
