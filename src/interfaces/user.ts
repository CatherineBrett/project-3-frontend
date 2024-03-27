export interface IUser {
  _id: string;
  username: string;
  email: string;
  bio: string;
  isAdmin?: boolean;
  gitHub?: string;
  linkedIn?: string;
}
