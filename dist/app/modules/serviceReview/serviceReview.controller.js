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
exports.CourseReviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const serviceReview_service_1 = require("./serviceReview.service");
const addCourseReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield serviceReview_service_1.CourseReviewService.addCourseReview(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review added successfully!',
        data: result,
    });
}));
const getSingleCourseReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield serviceReview_service_1.CourseReviewService.getSingleCourseReview(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review fetched successfully!',
        data: result,
    });
}));
const getAllCourseReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const courseId = req.params.courseId;
    const result = yield serviceReview_service_1.CourseReviewService.getAllCourseReviews(paginationOptions, courseId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reviews retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getReviewsByStudentId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const studentId = req.params.studentId;
    const result = yield serviceReview_service_1.CourseReviewService.getReviewsByStudentId(paginationOptions, studentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reviews by studentId retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const updateCourseReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.reviewId;
    const updatedData = req.body;
    const result = yield serviceReview_service_1.CourseReviewService.updateCourseReview(reviewId, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review updated successfully !',
        data: result,
    });
}));
const deleteCourseReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.reviewId;
    const result = yield serviceReview_service_1.CourseReviewService.deleteCourseReview(reviewId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review deleted successfully !',
        data: result,
    });
}));
const getAllReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield serviceReview_service_1.CourseReviewService.getAllReviews(paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reviews retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
exports.CourseReviewController = {
    addCourseReview,
    getSingleCourseReview,
    getAllCourseReview,
    getReviewsByStudentId,
    updateCourseReview,
    deleteCourseReview,
    getAllReviews
};
