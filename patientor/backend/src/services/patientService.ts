
import type {NonsensitivePatientsData, Patients, NewPatientEntry } from '../types.ts';

import patientsData from '../../data/patients.ts'
import {v4 as uuidv4} from 'uuid'
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
};

const addPatients = (entry: NewPatientEntry) : Patients => {
    const newPatientEntry = {
        id : uuidv4(),
        ...entry
    };
    patientsData.push(newPatientEntry);
    return newPatientEntry;
}

export default {
    getPatients,
    getNonsensitivePatients,
    addPatients
}