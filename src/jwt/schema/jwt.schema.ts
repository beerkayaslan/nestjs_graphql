import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JwtDocument = HydratedDocument<Jwt>;

@Schema()
export class Jwt {
  // issued at (created at)
  @Prop({ type: Number, required: true })
  iat: number;

  // expiration time
  @Prop({ type: Number, required: true })
  exp: number;

  // jwt id
  @Prop({ type: String, required: false })
  jwtid: string;
}

export const JwtSchema = SchemaFactory.createForClass(Jwt);
