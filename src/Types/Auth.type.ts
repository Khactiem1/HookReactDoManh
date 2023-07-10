import { User } from "./User.type";
import { ResponseApi } from "./Utils.type";

export type AuthResponse = ResponseApi<{
  token: string;
  user: User;
}>;
