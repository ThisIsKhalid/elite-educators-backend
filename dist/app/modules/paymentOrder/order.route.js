"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post('/payment-order', order_controller_1.OrderController.paymentOrder);
router.post('/payment/success', order_controller_1.OrderController.paymentSuccess);
router.post('/payment/fail', order_controller_1.OrderController.paymentFail);
// router.post('/payment/cancel', OrderController.paymentCancel);
router.get('/by-transaction-id/:transectionId', order_controller_1.OrderController.getSingleOrder);
// router.get('/by-student-id/:studentId', OrderController.getOrdersByStudentId);
// router.get('/by-course-id/:courseId', OrderController.getOrdersByCourseId);
exports.OrderRoutes = router;
