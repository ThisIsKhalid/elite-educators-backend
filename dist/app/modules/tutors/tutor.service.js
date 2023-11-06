"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorService = void 0;
const tutors_model_1 = require("./tutors.model");
const createTutor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutors_model_1.Tutor.create(data);
    return result;
});
const tutorStatusChange = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (status === 'accepted') {
        const result = yield tutors_model_1.Tutor.findByIdAndUpdate(id, { status: 'accepted' });
        return result;
    }
    const result = yield tutors_model_1.Tutor.findByIdAndDelete(id);
    return result;
});
exports.TutorService = {
    createTutor,
    tutorStatusChange,
};
