/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUserProfile } from './user.interface';
import { UserServices } from './user.service';

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;

    const user = req.user;
    const { id } = user!;

    const result = await UserServices.updateUser(id, userData);

    sendResponse<IUserProfile>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  }
);


export const UserControllers = {
  updateUser,
};
