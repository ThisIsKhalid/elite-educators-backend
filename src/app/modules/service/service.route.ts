import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceControllers } from './service.controller';
import { ServiceValidations } from './service.validation';

const router = express.Router();

router.post(
  '/add-service',
  validateRequest(ServiceValidations.addServiceSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceControllers.createService
);

router.patch(
  '/update-service/:id',
  validateRequest(ServiceValidations.updateServiceSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceControllers.updateService
);

export const ServiceRoutes = router;
