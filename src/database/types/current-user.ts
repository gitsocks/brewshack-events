import { User } from "@prisma/client";
import { UserApplication } from "./user-application";

export interface CurrentUser extends User {
    applications?: UserApplication[];
}