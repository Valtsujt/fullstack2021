import express from 'express';

const router = express.Router();

import patientService from '../services/patientsService';
import {toNewPatient, toNewPatientEntry} from '../utils';
router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);

  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    console.log(req.body);
    const newEntry = toNewPatientEntry(req.body);

    const modifiedPatient = patientService.addEntryToPatient(String(req.params.id), newEntry);
    res.json(modifiedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);

  }
});




export default router;