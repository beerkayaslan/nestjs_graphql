import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JwtDocument = HydratedDocument<Jwt>;

@Schema()
export class Jwt {
  @Prop({ type: Number, required: true })
  iat: number;

  @Prop({ type: Number, required: true })
  exp: number;

  @Prop({ type: String, required: false })
  jti: string;
}

export const JwtSchema = SchemaFactory.createForClass(Jwt);
