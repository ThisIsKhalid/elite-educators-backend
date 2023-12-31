import { Model, Types } from 'mongoose';
import { IUserProfile } from '../user/user.interface';
import { IService } from '../service/service.interface';

export type ICourseReview = {
  studentId: Types.ObjectId | IUserProfile;
  courseId: Types.ObjectId | IService;
  description: string;
  rating: number;
};

export type CourseReviewModel = Model<ICourseReview, Record<string, unknown>>;