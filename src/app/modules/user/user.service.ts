import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUserProfile } from './user.interface';
import { User } from './user.model';

const updateUser = async (
  id: string,
  payload: Partial<IUserProfile>
): Promise<IUserProfile | null> => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { email, role, password, ...others } = payload;

  const updatedUser = await User.findByIdAndUpdate(id, others, {
    new: true,
  });

  return updatedUser;
};

export const UserServices = {
  updateUser,
};
