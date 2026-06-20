
import type {NonsensitivePatientsData, Patients } from '../types.ts';

import patientsData from '../../data/patients.ts'

const getPatients = (): Patients[]=> {
    return patientsData;
}

const getNonsensitivePatients = () : NonsensitivePatientsData []=> {
    return patientsData.map(({id,name,dateOfBirth,gender,occupation})=> {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }
    });
}

export default {
    getPatients,
    getNonsensitivePatients
}