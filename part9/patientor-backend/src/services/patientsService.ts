import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NewPatientEntry,PublicPatient, Entry } from '../types';


let patients: Array<Patient> = patientsData;

const getEntries = (): Array<PublicPatient> => {
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

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id);
  if(patient) {
    return {...patient};
  } else {
    return undefined;
  }
};
const addEntry = () => {
  return null;
};

const addEntryToPatient=(id: string, entry: Entry):  Patient | undefined => {
  const patient = patients.find(d => d.id === id);
  if(patient) {
    const newE = {...entry, id: uuid()};
    const newP = {...patient, entries: patient.entries.concat(newE)};
    patients = patients.map(p => {
      if(p.id === id) {
        return newP;
      } else {
        return p;
      }
      
    });
    return newP;
  } else {
    return undefined;
  }
};

export default {
  getEntries,
  addEntry,
  addPatient,
  findById,
  addEntryToPatient
};