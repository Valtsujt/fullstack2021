
import { NewPatientEntry ,Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing name');
  }

  return string;
};

const parseOccupation = (string: unknown): string => {
    if (!string || !isString(string)) {
      throw new Error('Incorrect or missing occupation');
    }
  
    return string;
  };
const parseSsn = (string: unknown): string => {
    if (!string || !isString(string) || string.length !== 11) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return string;
  };
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
const parseGender = (string: unknown): Gender => {
    if (!string || !isString(string)) {
      throw new Error('Incorrect or missing gender');
    }
    if(string !== 'male' && string !== 'female' && string !=='other') {
        throw new Error('Incorrect or missing gender');
    }
  
    return string as Gender;
  };

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender,occupation } : Fields): NewPatientEntry => {

  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };

  return newEntry;
};

export default toNewPatientEntry;