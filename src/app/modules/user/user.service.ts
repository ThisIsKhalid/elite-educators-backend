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

const deleteUser = async (id: string): Promise<IUserProfile | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
}

const getUserProfile = async (id: string): Promise<IUserProfile | null> => {
  const result = await User.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return result;
};

const getAllUser = async (): Promise<IUserProfile[]> => {
  const result = await User.find();

  return result;
};

export const UserServices = {
  updateUser,
  getUserProfile,
  getAllUser,
  deleteUser
};
