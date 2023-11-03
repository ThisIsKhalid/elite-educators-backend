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
exports.BookingService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const booking_model_1 = require("./booking.model");
const addBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.create(data);
    return result;
});
const getallBookings = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield booking_model_1.Booking.find()
        .populate('userId')
        .populate('serviceId')
        .skip(skip)
        .limit(limit)
        .lean();
    const total = yield booking_model_1.Booking.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getAllBookingByUserId = (id, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield booking_model_1.Booking.find({ userId: id })
        .populate('userId')
        .populate('serviceId')
        .skip(skip)
        .limit(limit)
        .lean();
    const total = yield booking_model_1.Booking.countDocuments({ userId: id });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateBooking = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndDelete(id);
    return result;
});
const bookingAccepts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, {
        $set: {
            status: true,
        },
    }, { new: true });
    return result;
});
const getBookingsbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findById(id)
        .populate('userId')
        .populate('serviceId')
        .lean();
    return result;
});
exports.BookingService = {
    addBooking,
    getallBookings,
    getAllBookingByUserId,
    updateBooking,
    deleteBooking,
    bookingAccepts,
    getBookingsbyId,
};
