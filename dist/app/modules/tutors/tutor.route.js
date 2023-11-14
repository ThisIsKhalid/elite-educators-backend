"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorRoute = void 0;
const express_1 = __importDefault(require("express"));
const tutor_controller_1 = require("./tutor.controller");
const router = express_1.default.Router();
router.post('/create-tutor', tutor_controller_1.TutorController.createTutor);
router.patch('/tutor-status-change/:id', tutor_controller_1.TutorController.tutorStatusChange);
exports.TutorRoute = router;
