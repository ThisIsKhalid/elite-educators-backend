import { Types } from 'mongoose';
import { IUserProfile } from '../user/user.interface';

export type IService = {
  instructorId: Types.ObjectId | IUserProfile;
  subject: string;
  description: string;
  image: string;
  price: number;
  level: 'junior' | 'secondary' | 'higher-secondary';
  startTime: Date;
  endTime: Date;
  duration: string;
  rating?: number;
  location: string;
  weeklySchedules: IWeeklySchedule;
};

export type IWeeklySchedule = {
  days: (
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday'
  )[];
  seats: number;
  enrolled: number;
  isAvailable: boolean;
  classtime: string;
};

export type IServiceFilters = {
  searchTerm?: string;
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
}
