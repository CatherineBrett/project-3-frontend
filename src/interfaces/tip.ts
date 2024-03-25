import { IUser } from "./user";

export interface ITip {
  _id: string;
  name: string;
  cohort: string;
  emoji:
    | "study-tips"
    | "staying-motivated"
    | "self-care"
    | "comic-relief"
    | "misc";
  heading: string;
  tip: string;
  user: IUser;
}
