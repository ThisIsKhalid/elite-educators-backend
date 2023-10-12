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
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(0),
    class: z.enum(['junior', 'secondary', 'higher-secondary']),
    startTime: z.string({
      required_error: 'Start time is required',
    }),
    endTime: z.string({
      required_error: 'End time is required',
    }),
    lessonTime: z.string({
      required_error: 'Lesson time is required',
    }),
    rating: z.number().optional(),
    weeklySchedules: weeklyScheduleSchema,
  }),
});

export const ServiceValidations = {
  addServiceSchema,
};
