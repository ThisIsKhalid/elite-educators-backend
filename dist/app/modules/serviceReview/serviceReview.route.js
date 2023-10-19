"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const serviceReview_controller_1 = require("./serviceReview.controller");
const serviceReview_validation_1 = require("./serviceReview.validation");
const router = express_1.default.Router();
router.post('/add-review', (0, validateRequest_1.default)(serviceReview_validation_1.CourseReviewValidation.addCourseReviewSchema), serviceReview_controller_1.CourseReviewController.addCourseReview);
router.get('/:courseId', serviceReview_controller_1.CourseReviewController.getAllCourseReview);
router.get('/student-reviews/:studentId', serviceReview_controller_1.CourseReviewController.getReviewsByStudentId);
router.patch('/:reviewId', serviceReview_controller_1.CourseReviewController.updateCourseReview);
router.delete('/:reviewId', serviceReview_controller_1.CourseReviewController.deleteCourseReview);
router.get('/', serviceReview_controller_1.CourseReviewController.getAllReviews);
exports.CourseReviewRoutes = router;
