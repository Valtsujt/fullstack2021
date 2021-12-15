"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_json_1 = __importDefault(require("../../data/diagnoses.json"));
//import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';
const diagnoses = diagnoses_json_1.default;
const getEntries = () => {
    return diagnoses;
};
// const getdiagnosises = (): NonSensitiveDiaryEntry [] => {
//   return diaries.map(({ id, date, weather, visibility }) => ({
//     id,
//     date,
//     weather,
//     visibility,
//   }));
// };
// const findById = (id: number): DiaryEntry | undefined => {
//   const entry = diaries.find(d => d.id === id);
//   return entry;
// };
// const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
//   const newDiaryEntry = {
//     id: Math.max(...diaries.map(d => d.id)) + 1,
//     ...entry
//   };
//   diaries.push(newDiaryEntry);
//   return newDiaryEntry;
// };
const addEntry = () => {
    return null;
};
exports.default = {
    getEntries,
    addEntry,
    // getNonSensitiveEntries,
    // findById,
    // addDiary
};
