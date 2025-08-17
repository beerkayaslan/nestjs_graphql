import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

export type UserDocument = HydratedDocument<User>;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @HideField()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
