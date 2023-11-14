import { ITutorProfile } from './tutors.interface';
import { Tutor } from './tutors.model';

const createTutor = async (data: ITutorProfile): Promise<ITutorProfile> => {
  const result = await Tutor.create(data);

  return result;
};

const tutorStatusChange = async (
  id: string,
  status: string
): Promise<ITutorProfile | null> => {
  if (status === 'accepted') {
    const result = await Tutor.findByIdAndUpdate(id, { status: 'accepted' });
    return result;
  }
  const result = await Tutor.findByIdAndDelete(id);
  return result;
};



export const TutorService = {
  createTutor,
  tutorStatusChange,
};
