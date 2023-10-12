import { IService } from './service.interface';
import { Service } from './service.model';

const createService = async (payload: IService) => {
  const result = (await Service.create(payload)).populate('instructorId');

  return result;
};

export const ServiceServices = {
  createService,
};
