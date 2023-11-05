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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const booking_model_1 = require("../bookings/booking.model");
const service_model_1 = require("../service/service.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const paymentOrder = (order, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, email: studentEmail, phonenumber, address, bookingId, serviceId, batchId, } = order;
    //! check student exist or not. if exist get data
    const student = yield user_model_1.User.findOne({ email: studentEmail });
    if (!student) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student does not exist');
    }
    const { id } = student;
    // !  check course exist or not. if exist get data
    const course = yield service_model_1.Service.findById({ _id: serviceId });
    if (!course) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Course does not exist');
    }
    const { subject, level } = course;
    //! booking
    const booking = yield booking_model_1.Booking.findById({ _id: bookingId });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking does not exist');
    }
    const transectionId = (0, uuid_1.v4)();
    const data = {
        total_amount: (_a = booking === null || booking === void 0 ? void 0 : booking.batch) === null || _a === void 0 ? void 0 : _a.amountPerWeek,
        currency: 'BDT',
        tran_id: transectionId,
        success_url: `https://elite-educators-backend.vercel.app/api/v1/orders/payment/success?transectionId=${transectionId}`,
        fail_url: `https://elite-educators-backend.vercel.app/api/v1/orders/payment/fail?transectionId=${transectionId}`,
        cancel_url: `https://elite-educators-backend.vercel.app/api/v1/orders/payment/cancel?transectionId=${transectionId}`,
        ipn_url: 'http://localhost:5000/api/v1/orders/payment/ipn',
        shipping_method: 'Courier',
        product_name: subject,
        product_category: level,
        product_profile: 'general',
        cus_name: name,
        cus_email: studentEmail,
        cus_add1: address,
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: phonenumber,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const store_id = config_1.default.storeId;
    const store_passwd = config_1.default.storePassword;
    const is_live = false; //true for live, false for sandbox
    const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        // console.log(apiResponse.failedreason);
        if (apiResponse.status === 'FAILED') {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Payment Failed');
        }
        // eslint-disable-next-line prefer-const
        let GatewayPageURL = apiResponse.GatewayPageURL;
        const data = {
            studentId: id,
            serviceId,
            bookingId,
            batchId,
            transectionId,
            paid: false,
            amount: (_b = booking === null || booking === void 0 ? void 0 : booking.batch) === null || _b === void 0 ? void 0 : _b.amountPerWeek,
            sessionkey: apiResponse.sessionkey,
        };
        yield order_model_1.Orders.create(data);
        res.send({ url: GatewayPageURL });
    }));
});
const paymentSuccess = (transectionId, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Orders.findOneAndUpdate({ transectionId }, {
        $set: {
            paid: true,
        },
    }, {
        new: true,
    });
    // let userRole;
    // if (order?.paid) {
    //   const session = await mongoose.startSession();
    //   try {
    //     session.startTransaction();
    //     const student = await User.findByIdAndUpdate(
    //       { _id: order.studentId },
    //       {
    //         $set: {
    //           role: 'student',
    //         },
    //         $push: {
    //           enrolledCourses: {
    //             courseId: order.courseId,
    //           },
    //         },
    //       },
    //       {
    //         new: true,
    //       }
    //     );
    //     userRole = student?.role;
    //     console.log(student);
    //     await Course.findByIdAndUpdate(
    //       { _id: order.courseId },
    //       {
    //         $inc: {
    //           totalEnrolled: 1,
    //         },
    //       },
    //       {
    //         new: true,
    //       }
    //     );
    //     await session.commitTransaction();
    //     await session.endSession();
    //   } catch (error) {
    //     await session.abortTransaction();
    //     await session.endSession();
    //     throw error;
    //   }
    // }
    if (order === null || order === void 0 ? void 0 : order.paid) {
        res.redirect(`https://elite-educators-frontend.vercel.app/services/payment/${transectionId}`);
    }
});
const paymentFail = (transectionId, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Orders.findOneAndDelete({ transectionId });
    if (!(result === null || result === void 0 ? void 0 : result.paid)) {
        res.redirect(`https://elite-educators-frontend.vercel.app/services/payment/${transectionId}`);
    }
});
// const paymentCancel = async (transectionId: any, res: Response) => {
//   const result = await Orders.findOneAndDelete({ transectionId });
//   if (!result?.paid) {
//     res.redirect(`https://dminstitutebd.vercel.app/payment/status/failed`);
//   }
// };
// by transenction id
const getSingleOrder = (transectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Orders.findOne({ transectionId })
        .populate('studentId')
        .populate('serviceId')
        .populate('bookingId');
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order does not exist');
    }
    return result;
});
// const getOrdersByStudentId = async (studentId: string): Promise<IOrder[]> => {
//   const result = await Orders.find({ studentId })
//     .populate('studentId')
//     .populate('courseId');
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Orders did not exist');
//   }
//   return result;
// };
// const getOrdersByCourseId = async (courseId: string): Promise<IOrder[]> => {
//   const result = await Orders.find({ courseId })
//     .populate('studentId')
//     .populate('courseId');
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Orders did not exist');
//   }
//   return result;
// };
exports.OrderService = {
    paymentOrder,
    paymentSuccess,
    getSingleOrder,
    paymentFail,
    // getOrdersByStudentId,
    // getOrdersByCourseId,
    // paymentCancel,
};
