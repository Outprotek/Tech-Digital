import { JsonValue } from "@prisma/client/runtime/library";

export type AddUserParams = {
  imageUrl: string;
  userName: string;
  displayName: string;
  email: string;
  phoneNumber: number;
  age: number;
  password: string;
  address?: JsonValue;
};
