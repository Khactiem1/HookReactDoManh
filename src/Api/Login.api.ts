import { User } from "../Types/User.type";
import http from "../Utils/Http";

// api login
export const userLogin = (user: User) => http.post<User[]>("User/login", user);
// api logout
// export const userLogout = (user: User) => http.post<User[]>("User/logout", user);
