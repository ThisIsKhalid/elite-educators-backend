"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const addBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'Service ID is required',
        }),
        status: zod_1.z.boolean({
            required_error: 'Status is required',
        }),
        batch: zod_1.z.object({
            amountPerWeek: zod_1.z.number({
                required_error: 'Amount per week is required',
            }),
            daysPerWeek: zod_1.z.number({
                required_error: 'Days per week is required',
            }),
            _id: zod_1.z.string({
                required_error: 'Batch ID is required',
            }),
        }),
        startDate: zod_1.z.string({
            required_error: 'Start date is required',
        }),
        endDate: zod_1.z.string({
            required_error: 'End date is required',
        }),
    }),
});
exports.BookingValidation = {
    addBookingZodSchema
};
