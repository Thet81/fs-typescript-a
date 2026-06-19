
import express from 'express';
import diagnoseRoute from './routes/diagnoses.ts'

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping',(_req,res)=> {
    res.send("Pong");
})

app.use('/api/diagnoses', diagnoseRoute);
app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);
})