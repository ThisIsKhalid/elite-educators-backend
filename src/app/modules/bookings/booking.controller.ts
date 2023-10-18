import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBooking } from './booking.interface';
import { BookingService } from './booking.service';

const addBooking = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BookingService.addBooking(data);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service booked successfully !',
    data: result,
  });
});


export const BookingController = {
    addBooking
}
