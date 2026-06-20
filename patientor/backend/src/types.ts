
export interface Diagnoses {
    code : string;
    name : string;
    latin ?: string;
}
type Gender = 'male' | 'female' | 'other'

export interface Patients {
    id : string;
    name : string;
    dateOfBirth : string;
    ssn : string;
    gender : Gender;
    occupation : string;
}

export type NonsensitivePatientsData = Omit<Patients,'ssn'>;