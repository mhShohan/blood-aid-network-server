import { Router } from 'express';
import userControllers from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import userValidator from './user.validator';
import verifyAuth from '../../middlewares/verifyAuth';

const userRoutes = Router();

userRoutes.post(
  '/register',
  validateRequest(userValidator.registerSchema),
  userControllers.register,
);

userRoutes.post('/login', validateRequest(userValidator.loginSchema), userControllers.login);

userRoutes.get('/donor-list', userControllers.getAllDonar);

userRoutes.post(
  '/donation-request',
  verifyAuth,
  validateRequest(userValidator.donationSchema),
  userControllers.donationRequest,
);

userRoutes.get('/donation-request', verifyAuth, userControllers.getAllDonationRequest);

userRoutes.put(
  '/donation-request/:id',
  verifyAuth,
  validateRequest(userValidator.updateDonationStatusSchema),
  userControllers.updateDonationRequestStatus,
);

userRoutes.get('/my-profile', verifyAuth, userControllers.getProfile);

export default userRoutes;
