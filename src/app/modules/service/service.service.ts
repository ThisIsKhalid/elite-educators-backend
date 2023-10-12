import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IService } from './service.interface';
import { Service } from './service.model';

const createService = async (payload: IService) => {
  const result = (await Service.create(payload)).populate('instructorId');

  return result;
};

const updateService = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const isExist = await Service.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const ServiceServices = {
  createService,
  updateService
};
