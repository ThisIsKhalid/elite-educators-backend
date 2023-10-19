"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseReviewValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const addCourseReviewSchema = zod_1.default.object({
    body: zod_1.default.object({
        studentId: zod_1.default.string({
            required_error: 'Student ID is required.',
        }),
        courseId: zod_1.default.string({
            required_error: 'Course ID is required.',
        }),
        description: zod_1.default.string({
            required_error: 'Description is required.',
        }),
        rating: zod_1.default.number({
            required_error: 'Rating is required.',
        }),
    }),
});
const updateCourseReviewSchema = zod_1.default.object({
    body: zod_1.default.object({
        studentId: zod_1.default.string().optional(),
        courseId: zod_1.default.string().optional(),
        description: zod_1.default.string().optional(),
        rating: zod_1.default.number().optional(),
    }),
});
exports.CourseReviewValidation = {
    addCourseReviewSchema,
    updateCourseReviewSchema
};
