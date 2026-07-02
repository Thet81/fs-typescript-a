
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FemaleIcon from '@mui/icons-material/Female'
import axios from "axios";
import { Icon } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
const Patient = ({patients}) => {
    const [patient, setPatient] = useState();
    const [loading, setLoading] = useState(true)

    const id = useParams().id
    console.log(id)

    useEffect(()=> {
        axios.get(`/api/patients/${id}`)
        .then(response => {
            console.log(response)
            setLoading(false)
            setPatient(response.data)
        })
        .catch(e=> {
            console.log(e)
        })

    },[])
   
    if(loading){
        return (
            <p>Loading....</p>
        )
    }
    return (
        <div>
            <h1>{patient.name}{patient.gender == 'female' ? (<Icon><FemaleIcon/></Icon>) : patient.gender == 'male' ? (<Icon><MaleIcon/></Icon>) : ""}</h1>
            <p>ssn : {patient.ssn}</p>
            <p>occupation : {patient.occupation}</p>
            <p>date of birth : {patient.dateOfBirth}</p>
        </div>
    )
}

export default Patient;