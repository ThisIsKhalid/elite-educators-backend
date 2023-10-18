import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/add',
  validateRequest(BookingValidation.addBookingZodSchema),
  BookingController.addBooking
);

export const BookingRoutes = router;
