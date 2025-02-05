import { Model, Types } from 'mongoose';

export type TUserRole = 'admin' | 'user';

export type TUser = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TUserModel = Model<TUser> & {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};
