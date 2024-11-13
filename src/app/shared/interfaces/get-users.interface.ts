import { User } from "../../models/user.model";

export interface GetUsersResponse {
    total: number;
    users: User[];
}
