import { Hospital } from "../../models/hospital.model";

export interface GetHospitalsResponse {
    total: number;
    hospitals: Hospital[];
}
