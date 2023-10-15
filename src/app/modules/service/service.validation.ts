import { z } from 'zod';

const weeklyScheduleSchema = z.object({
  days: z.array(
    z.enum([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ])
  ),
  seats: z.number().min(0),
  enrolled: z.number().min(0),
  isAvailable: z.boolean(),
  classtime: z.string(),
});

const addServiceSchema = z.object({
  body: z.object({
    instructorId: z.string({
      required_error: 'Instructor ID is required',
    }),
    subject: z.string({
      required_error: 'Subject is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(0),
    level: z.enum(['junior', 'secondary', 'higher-secondary']),
    startTime: z.string({
      required_error: 'Start time is required',
    }),
    endTime: z.string({
      required_error: 'End time is required',
    }),
    duratiorn: z.string({
      required_error: 'Lesson time is required',
    }),
    rating: z.number().optional(),
    location: z.string({
      required_error: 'Location is required',
    }),
    weeklySchedules: weeklyScheduleSchema,
  }),
});

const updateServiceSchema = z.object({
  body: z.object({
    instructorId: z.string().optional(),
    subject: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(0).optional(),
    level: z.enum(['junior', 'secondary', 'higher-secondary']).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    duration: z.string().optional(),
    rating: z.number().optional(),
    location: z.string().optional(),
    weeklySchedules: weeklyScheduleSchema.optional(),
  }),
});

export const ServiceValidations = {
  addServiceSchema,
  updateServiceSchema,
};
