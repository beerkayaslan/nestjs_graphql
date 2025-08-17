import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { Jwt, JwtSchema } from './schema/jwt.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jwt.name, schema: JwtSchema }]),
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get<string>('JWT_PRIVATE_KEY'),
        publicKey: configService.get<string>('JWT_PUBLIC_KEY'),
        signOptions: {
          algorithm: 'RS256',
          expiresIn: '15m',
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService],
})
export class JwtModule {}
