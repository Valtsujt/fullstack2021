export enum Gender {
    male = "male",
    female = "female",
    other = "other"
}

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]

}
export interface discharge {
    date:string,
    criteria:string
}
interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: discharge
}
export interface SickLeave {
    startDate:string,
    endDate:string
}
interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName:string;
    sickLeave?:SickLeave;
}


export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry
    | NewHospitalEntry
    | NewOccupationalHealthcareEntry
    | NewHealthCheckEntry;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
