import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async login(email: string, password: string): Promise<User | null> {
    return this.userModel.findOne({ email, password }).exec();
  }
}
