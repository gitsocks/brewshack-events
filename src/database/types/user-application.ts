import { Application } from "@prisma/client";

export interface UserApplication extends Application {
    role: string;
}