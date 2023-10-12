import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IService } from './service.interface';
import { ServiceServices } from './service.service';

const createService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await ServiceServices.createService(data);

    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service created successfully!',
      data: result,
    });
  }
);


export const ServiceControllers = {
  createService,
};
