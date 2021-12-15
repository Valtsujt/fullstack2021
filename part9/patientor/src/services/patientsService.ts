import patientsData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';


const patients: Array<Patient> = patientsData as Array<Patient>;

const getEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  addPatient
};