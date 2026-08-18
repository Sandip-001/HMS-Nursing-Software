import { UserRole } from "@/config/roles";
import { dummyUsers } from "./dummyUsers";

const USER_KEY = "hms_user";


export interface LoggedInUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}


export function loginUser(
  email: string,
  password: string,
  role: UserRole
): LoggedInUser | null {


  const user = dummyUsers.find(
    (item) =>
      item.email === email &&
      item.password === password &&
      item.role === role
  );


  if (!user) {
    return null;
  }


  const loggedUser: LoggedInUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };


  localStorage.setItem(
    USER_KEY,
    JSON.stringify(loggedUser)
  );


  return loggedUser;
}



export function getCurrentUser(): LoggedInUser | null {

  if(typeof window === "undefined"){
    return null;
  }


  const user = localStorage.getItem(USER_KEY);


  return user 
    ? JSON.parse(user)
    : null;
}



export function logoutUser(){

  localStorage.removeItem(USER_KEY);
  
}