"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const diagnosisService_1 = __importDefault(require("../services/diagnosisService"));
router.get('/', (_req, res) => {
    res.send(diagnosisService_1.default.getEntries());
});
// router.get('/:id', (req, res) => {
//   const diary = diaryService.findById(Number(req.params.id));
//   if (diary) {
//     res.send(diary);
//   } else {
//     res.sendStatus(404);
//   }
// });
// router.post('/', (req, res) => {
//   try {
//     const newDiaryEntry = toNewDiaryEntry(req.body);
//     const addedEntry = diaryService.addDiary(newDiaryEntry);
//     res.json(addedEntry);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });
exports.default = router;
