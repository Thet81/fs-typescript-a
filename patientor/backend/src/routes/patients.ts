
import express from 'express';
import patientService from '../services/patientService.ts';
const router = express.Router();

router.get('/',(_req,res)=> {
    const patientData = patientService.getNonsensitivePatients();
    res.send(patientData);
});

export default router;

