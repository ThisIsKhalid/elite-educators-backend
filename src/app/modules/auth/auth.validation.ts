import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required.',
    }),
    email: z.string({
      required_error: 'Email is required.',
    }).email(),
    password: z.string({
      required_error: 'Password is required',
    }),
    profileImgUrl: z.string({
      required_error: 'Profile image url is required.',
    }),
    phonenumber: z.string({
      required_error: 'Phone number is required.',
    }),
  }),
});

export const AuthValidations = {
  createUserZodSchema,
};
