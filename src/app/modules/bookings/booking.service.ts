import { Booking } from './booking.model';
import { IBooking } from './bookings.interface';

const addBooking = async (data: IBooking): Promise<IBooking> => {
  const result = await Booking.create(data);

  return result;
};

const getallBookingByServiceId = async (id: string): Promise<IBooking[]> => {
  const result = await Booking.find({ serviceId: id })
    .populate('userId')
    .populate('serviceId');

  return result;
};

const getAllBookingByUserId = async (id: string): Promise<IBooking[]> => {
  const result = await Booking.find({ userId: id })
    .populate('userId')
    .populate('serviceId');

  return result;
};

const updateBooking = async (id: string, data: IBooking): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndUpdate(id, data, { new: true });

  return result;
};

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndDelete(id);

  return result;
};

const bookingAccepts = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndUpdate(
    id,
    {
      $set: {
        status: true,
      },
    },
    { new: true }
  );

  return result;
};

export const BookingService = {
  addBooking,
  getallBookingByServiceId,
  getAllBookingByUserId,
  updateBooking,
  deleteBooking,
  bookingAccepts,
};
