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
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const order_service_1 = require("./order.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const paymentOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    // console.log(order);
    yield order_service_1.OrderService.paymentOrder(order, res);
}));
const paymentSuccess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transectionId } = req.query;
    yield order_service_1.OrderService.paymentSuccess(transectionId, res);
}));
const paymentFail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transectionId } = req.query;
    yield order_service_1.OrderService.paymentFail(transectionId, res);
}));
// const paymentCancel = catchAsync(async (req: Request, res: Response) => {
//   const { transectionId } = req.query;
//   await OrderService.paymentCancel(transectionId, res);
// });
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transectionId = req.params.transectionId;
    const result = yield order_service_1.OrderService.getSingleOrder(transectionId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order by transection id fetched successfully',
        data: result,
    });
}));
// const getOrdersByStudentId = catchAsync(async (req: Request, res: Response) => {
//   const studentId = req.params.studentId;
//   const result = await OrderService.getOrdersByStudentId(studentId);
//   sendResponse<IOrder[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order by student id fetched successfully',
//     data: result,
//   });
// });
// const getOrdersByCourseId = catchAsync(async (req: Request, res: Response) => {
//   const courseId = req.params.courseId;
//   const result = await OrderService.getOrdersByCourseId(courseId);
//   sendResponse<IOrder[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order by course id fetched successfully',
//     data: result,
//   });
// });
exports.OrderController = {
    paymentOrder,
    paymentSuccess,
    getSingleOrder,
    paymentFail,
    // getOrdersByStudentId,
    // getOrdersByCourseId,
    // paymentCancel,
};
