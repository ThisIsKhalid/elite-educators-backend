import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TutorService } from './tutor.service';

const createTutor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorService.createTutor(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  }
);

export const TutorController = {
  createTutor,
};
