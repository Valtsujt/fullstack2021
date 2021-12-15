
import {
  NewPatientEntry, Gender,  NewHospitalEntry,
  discharge, Entry, NewOccupationalHealthcareEntry, NewHealthCheckEntry,
  SickLeave , HealthCheckRating
} from './types';

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
  if (string !== 'male' && string !== 'female' && string !== 'other') {
    throw new Error('Incorrect or missing gender');
  }

  return string as Gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {

  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newEntry;
};

const parseType = (type: unknown): string => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing type');
  }
  return type;
};
const parseDesc = (desc: unknown): string => {
  if (!desc || !isString(desc)) {
    throw new Error('Incorrect or missing description');
  }
  return desc;
};
const parseSpec = (spec: unknown): string => {
  if (!spec || !isString(spec)) {
    throw new Error('Incorrect or missing spec');
  }
  return spec;
};
const parseEmp = (Emp: unknown): string => {
  if (!Emp || !isString(Emp)) {
    throw new Error('Incorrect or missing spec');
  }
  return Emp;
};
const parseCodes = (codes: unknown): string[] => {
  if (codes instanceof Array) {
    for (let i = 0; i < codes.length; i++) {
      if (!isString(codes[i])) {
        throw new Error('Incorrect code');
      }
    }

  } else {
    throw new Error('diagnosisCodes must be array');
  }
  return codes as string[];
};
const parseHealtCheck = (p: unknown) : HealthCheckRating => {
  console.log(p);
  if( !(p === 0 || p ===1 || p ===2 || p === 3)) {
    throw new Error('HealthCheckrating must be 0-3');
  }
  return p;
};
type discFields = { date: string, criteria: string };
const parseDisc = ({ date, criteria }: discFields): discharge => {
  console.log(date);
  console.log(!date);
  console.log(isString(date));
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing discharge date');
  }
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing discharge criteria');
  }
  return { date: date, criteria: criteria };
};

type sickFields = { startDate: string, endDate: string };
const parseSick = ({ startDate, endDate }: sickFields): SickLeave => {
  if (!startDate || isString(startDate)) {
    throw new Error('Incorrect or missing sickleave');
  }
  if (!endDate || isString(endDate)) {
    throw new Error('Incorrect or missing sickleave');
  }
  return { startDate: startDate, endDate: endDate };
};

type EntryFields = {
  description: unknown, date: unknown, specialist: unknown,
  diagnosisCodes: unknown, type: unknown, healthCheckRating: unknown, discharge: unknown
  employerName: unknown, sickLeave: unknown
};
export const toNewPatientEntry = ({ description, date, specialist,
  diagnosisCodes, type, discharge, employerName, sickLeave,healthCheckRating }: EntryFields): Entry => {
  const parsedType = parseType(type);
  const parsedDate = parseDate(date);
  const parsedDesc = parseDesc(description);
  const parsedSpec = parseSpec(specialist);
  let parsedCodes = undefined;
  if (diagnosisCodes) {
    parsedCodes = parseCodes(diagnosisCodes);
  }

  let sickleaves = undefined;
  if (sickLeave) {
    sickleaves = parseSick(sickLeave as sickFields);
  }
  switch (parsedType) {
    case "Hospital":
      if (!discharge) {
        throw new Error('Incorrect or missing discharge');
      }
      const aa: NewHospitalEntry = {
        type: "Hospital",
        description: parsedDesc,
        date: parsedDate,
        specialist: parsedSpec,
        diagnosisCodes: parsedCodes,
        discharge: parseDisc(discharge as discFields)

      };
      return aa;
    case "OccupationalHealthcare":
      const bb: NewOccupationalHealthcareEntry = {
        type: "OccupationalHealthcare",
        description: parsedDesc,
        date: parsedDate,
        specialist: parsedSpec,
        diagnosisCodes: parsedCodes,
        employerName: parseEmp(employerName),
        sickLeave: sickleaves

      };
      return bb;
    case "HealthCheck":
      const cc: NewHealthCheckEntry = {
        type: "HealthCheck",
        description: parsedDesc,
        date: parsedDate,
        specialist: parsedSpec,
        diagnosisCodes: parsedCodes,
        healthCheckRating: parseHealtCheck(healthCheckRating)

      };
      return cc;
    default:
      throw new Error('type must be given');
  }

};

