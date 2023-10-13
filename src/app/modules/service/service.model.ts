import { Schema, model } from 'mongoose';
import { IService, IWeeklySchedule } from './service.interface';

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
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['junior', 'secondary', 'higher-secondary'],
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    lessonTime: {
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
