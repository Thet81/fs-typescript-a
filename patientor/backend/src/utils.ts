import { GenderValues, type NewPatientEntry } from "./types.ts";
import z from "zod";


export const NewPatientSchema = z.object({
    name : z.string(),
    dateOfBirth : z.string(),
    ssn : z.string(),
    gender : z.enum(GenderValues),
    occupation : z.string()
});


export const parsePatientEntry = (object : unknown) : NewPatientEntry => {
    return NewPatientSchema.parse(object);
}


