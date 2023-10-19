"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required.',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required.',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        profileImgUrl: zod_1.z.string().optional(),
        phonenumber: zod_1.z.string({
            required_error: 'Phone number is required.',
        }),
        role: zod_1.z.literal('user').optional(),
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required.',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.AuthValidations = {
    createUserZodSchema,
    loginUserZodSchema,
};
