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
exports.CourseReviewService = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_model_1 = require("../user/user.model");
const service_model_1 = require("../service/service.model");
const serviceReview_model_1 = require("./serviceReview.model");
const addCourseReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, courseId, studentId } = payload;
    const isStudentExist = yield user_model_1.User.findById({ _id: studentId });
    if (!isStudentExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found');
    }
    const isCourseExist = yield service_model_1.Service.findById({ _id: courseId });
    if (!isCourseExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    let result = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const totalRating = isCourseExist.rating + rating;
        const totalPeople = isCourseExist.enrolled + 1;
        const newRating = (totalRating / totalPeople).toFixed(1);
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const updateCourse = yield service_model_1.Service.findByIdAndUpdate({ _id: courseId }, {
            $set: {
                rating: newRating,
                enrolled: totalPeople,
            },
        }, { new: true });
        result = yield serviceReview_model_1.CourseReview.create(payload);
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return result;
});
const getSingleCourseReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceReview_model_1.CourseReview.findById(id);
    return result;
});
// : courseid
const getAllCourseReviews = (paginationOptions, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield serviceReview_model_1.CourseReview.find({ courseId })
        .populate('studentId')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    const total = yield serviceReview_model_1.CourseReview.countDocuments({ courseId });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getReviewsByStudentId = (paginationOptions, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield serviceReview_model_1.CourseReview.find({ studentId })
        .populate('studentId')
        .skip(skip)
        .limit(limit);
    const total = yield serviceReview_model_1.CourseReview.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateCourseReview = (reviewId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceReview_model_1.CourseReview.findByIdAndUpdate({ _id: reviewId }, updatedData, {
        new: true,
    });
    return result;
});
const deleteCourseReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceReview_model_1.CourseReview.findByIdAndDelete({ _id: reviewId });
    return result;
});
const getAllReviews = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        if (sortOrder === 'asc' || sortOrder === 'desc') {
            sortConditions[sortBy] = sortOrder;
        }
    }
    const result = yield serviceReview_model_1.CourseReview.find()
        .populate('studentId')
        .populate('courseId')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield serviceReview_model_1.CourseReview.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.CourseReviewService = {
    addCourseReview,
    getSingleCourseReview,
    getAllCourseReviews,
    getReviewsByStudentId,
    updateCourseReview,
    deleteCourseReview,
    getAllReviews,
};
