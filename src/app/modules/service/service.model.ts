import { Schema, model } from 'mongoose';
import { IPrice, IService } from './service.interface';

const PriceSchema = new Schema<IPrice>({
  amountPerWeek: {
    type: Number,
    required: true,
  },
  daysPerWeek: {
    type: Number,
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
    },
    price: [PriceSchema],
    level: {
      type: String,
      enum: ['junior', 'secondary', 'higher-secondary'],
      required: true,
    },
    rating: {
      type: Number,
      default: 3,
    },
    location: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Service = model<IService>('Service', serviceSchema);
