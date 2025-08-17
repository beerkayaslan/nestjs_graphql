import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Jwt, JwtDocument } from './schema/jwt.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    @InjectModel(Jwt.name) private readonly jwtModel: Model<JwtDocument>,
  ) {}

  async signJwt({
    payload,
    expires,
  }: {
    payload: object;
    expires?: number;
  }): Promise<string> {
    const uuid = randomUUID();
    const expiresIn = expires ?? Date.now() + 3600 * 1000;

    const jwt = await this.jwtService.signAsync(payload, {
      jwtid: uuid,
      expiresIn,
    });

    const token = new this.jwtModel({
      jwtid: uuid,
      iat: Date.now(),
      exp: expiresIn,
    });

    try {
      await token.save();
    } catch (error) {
      throw new Error(`Error saving JWT token: ${error}`);
    }

    return jwt;
  }

  async verifyJwt<T extends object>(token: string): Promise<T> {
    return this.jwtService.verifyAsync<T>(token);
  }

  async decodeJwt<T extends object>(token: string): Promise<T | null> {
    return this.jwtService.decode(token);
  }
}
