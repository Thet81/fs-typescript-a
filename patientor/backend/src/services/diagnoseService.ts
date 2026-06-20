
import diagnoses from '../../data/diagnoses.ts'
import type { Diagnoses } from '../types.ts';
const getDiagnoses = () : Diagnoses[]=> {
    return diagnoses;
}

export default {
    getDiagnoses
}

