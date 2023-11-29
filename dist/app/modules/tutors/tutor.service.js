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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const tutors_model_1 = require("./tutors.model");
const createTutor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = data;
    const isTutorIxist = yield tutors_model_1.Tutor.findById(userId);
    if (isTutorIxist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You already have a tutor profile');
    }
    const result = (yield tutors_model_1.Tutor.create(data)).populate('userId');
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
