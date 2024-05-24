import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import verifyAuth from '../../middlewares/verifyAuth';
import requestValidators from './request.validator';
import requestControllers from './request.controllers';

const requestRoutes = Router();

requestRoutes.post(
  '/',
  verifyAuth,
  validateRequest(requestValidators.bloodRequestSchema),
  requestControllers.createDonationRequest
);

requestRoutes.get(
  '/',
  requestControllers.getAllDonationRequest
);


export default requestRoutes;
