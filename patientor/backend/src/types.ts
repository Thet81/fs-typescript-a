import z from "zod";
import { NewPatientSchema } from "./utils.ts";

export interface Diagnoses {
    code : string;
    name : string;
    latin ?: string;
}
 
export const GenderValues = {
    Male : 'male',
    Felale : 'female',
    Other : 'other'
}as const;

export type Gender = typeof GenderValues[keyof typeof GenderValues];

export interface Patients {
    id : string;
    name : string;
    dateOfBirth : string;
    ssn : string;
    gender : Gender;
    occupation : string;
}

// export type NonsensitivePatientsData = Omit<Patients,'ssn'>;
// export type NewPatientEntry = Omit<Patients,'id'>;
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

