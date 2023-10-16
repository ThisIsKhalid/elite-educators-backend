import { Schema, model } from 'mongoose';
import { IService, IWeeklySchedule } from './service.interface';
import { monthsArray } from './service.constant';

const weeklyScheduleSchema = new Schema<IWeeklySchedule>({
  days: [
    {
      type: String,
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
  ],
  seats: {
    type: Number,
    default: 0,
  },
  enrolled: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  classtime: {
    type: String,
    required: true,
  },
});

const serviceSchema = new Schema<IService>(
  {
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      enum: ['junior', 'secondary', 'higher-secondary'],
      required: true,
    },
    startTime: {
      type: String,
      enum: monthsArray,
      required: true,
    },
    endTime: {
      type: String,
      enum: monthsArray,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: true,
    },
    weeklySchedules: {
      type: weeklyScheduleSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Service = model<IService>('Service', serviceSchema);
