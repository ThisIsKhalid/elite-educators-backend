"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseReview = void 0;
const mongoose_1 = require("mongoose");
const courseReviewSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.CourseReview = (0, mongoose_1.model)('CourseReview', courseReviewSchema);
