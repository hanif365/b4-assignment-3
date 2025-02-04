import { Types } from "mongoose";

export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type TLoginResponse = {
  token: string;
};

export type TRegisterResponse = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};
