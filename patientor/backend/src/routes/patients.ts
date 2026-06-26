
import express, {type Request, type Response} from 'express';
import patientService from '../services/patientService.ts';
import middleware from '../middlewares/middleware.ts';
import type{ NewPatientEntry,Patients } from '../types.ts';
const router = express.Router();

router.get('/',(_req,res)=> {
    const patientData = patientService.getNonsensitivePatients();
    res.send(patientData);
});

router.post('/',middleware.parsePatient,(req : Request<unknown,unknown,NewPatientEntry>,res : Response<Patients>)=>{
    const addedPatient = patientService.addPatients(req.body);
    res.json(addedPatient);
})

router.use(middleware.parseError);
export default router;

