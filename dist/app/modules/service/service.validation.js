"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidations = void 0;
const zod_1 = require("zod");
const IPriceSchema = zod_1.z.object({
    amountPerWeek: zod_1.z.number(),
    daysPerWeek: zod_1.z.number(),
});
const addServiceSchema = zod_1.z.object({
    body: zod_1.z.object({
        instructorId: zod_1.z.string({
            required_error: 'Instructor id is required',
        }),
        subject: zod_1.z.string({
            required_error: 'Subject is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        image: zod_1.z.string().optional(),
        price: zod_1.z.array(IPriceSchema),
        level: zod_1.z.enum(['junior', 'secondary', 'higher-secondary']),
        rating: zod_1.z.number().optional(),
        location: zod_1.z.string({
            required_error: 'Location is required',
        }),
        seats: zod_1.z.number({
            required_error: 'Seats is required',
        }),
        enrolled: zod_1.z.number().optional().default(0),
        isAvailable: zod_1.z.boolean().optional().default(true),
        classtime: zod_1.z.string({
            required_error: 'Classtime is required',
        }),
    }),
});
const updateServiceSchema = zod_1.z.object({
    body: zod_1.z.object({
        instructorId: zod_1.z.string().optional(),
        subject: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        price: zod_1.z.array(IPriceSchema).optional(),
        level: zod_1.z.enum(['junior', 'secondary', 'higher-secondary']),
        rating: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        seats: zod_1.z.number().optional(),
        enrolled: zod_1.z.number().optional(),
        isAvailable: zod_1.z.boolean().optional(),
        classtime: zod_1.z.string().optional(),
    }),
});
exports.ServiceValidations = {
    addServiceSchema,
    updateServiceSchema,
};
