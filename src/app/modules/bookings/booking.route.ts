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

router.get('/service/:serviceId', BookingController.getallBookingByServiceId);

router.get('/user/:userId', BookingController.getAllBookingByUserId);

router.delete('/:id', BookingController.deleteBooking);

router.patch('/status/:id', BookingController.bookingAccepts);

export const BookingRoutes = router;
