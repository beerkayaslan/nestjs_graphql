import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import type { JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async signJwt({
    payload,
    options,
  }: {
    payload: object;
    options?: JwtSignOptions;
  }): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }

  async verifyJwt<T extends object>(token: string): Promise<T> {
    return this.jwtService.verifyAsync<T>(token);
  }

  async decodeJwt<T extends object>(token: string): Promise<T | null> {
    return this.jwtService.decode(token);
  }
}
