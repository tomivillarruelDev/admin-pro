import { Doctor } from "../../models/doctor.model";

export interface GetDoctorsResponse {
    total: number;
    doctors: Doctor[];
}
