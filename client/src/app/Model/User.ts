export class User {
    id: string;
    firstName: string;
    lastName: string;
    phone1: string;
    phone2: string;
    knownAs: string;
    emailAddress: string;
    userName: string;
    passwordHash: any;
    passwordSalt: any;
    question: string;
    answer: string;
    projectAdmin: number;
    systemAdmin: number;
    }

export class UserStatus {
    userLoggedIn: boolean;
    systemAdmin: boolean;
    userId: number;
    userName: string;
    }

export class UserShortModel {
  firstName: string;
  lastName: string;
  phone1: string;
  phone2: string;
  knownAs: string;
  emailAddress: string;
  userName: string;
  password: string;
  question: string;
  answer: string;
  systemAdmin: boolean;
}
