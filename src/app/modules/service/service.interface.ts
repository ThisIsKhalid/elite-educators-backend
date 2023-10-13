import { Types } from 'mongoose';
import { IUserProfile } from '../user/user.interface';

export type IService = {
  instructorId: Types.ObjectId | IUserProfile;
  subject: string;
  description: string;
  price: number;
  category: 'junior' | 'secondary' | 'higher-secondary';
  startTime: Date;
  endTime: Date;
  lessonTime: string;
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
};

export type IServiceFilters = {
  searchTerm?: string;
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
}
