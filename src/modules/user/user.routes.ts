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

userRoutes.get('/donor-list/:id', userControllers.getSingleDonor)

userRoutes.post(
  '/donation-request',
  verifyAuth,
  validateRequest(userValidator.donationSchema),
  userControllers.donationRequest,
);

userRoutes.get('/donation-request', verifyAuth, userControllers.getAllDonationRequest);
userRoutes.get('/donation-history', verifyAuth, userControllers.getAllDonateHistory);

userRoutes.patch(
  '/donation-request/:id',
  verifyAuth,
  validateRequest(userValidator.updateDonationStatusSchema),
  userControllers.updateDonationRequestStatus,
);

userRoutes.get('/profile/self', verifyAuth, userControllers.getProfile);
userRoutes.patch('/profile/change-password', verifyAuth, validateRequest(userValidator.changePasswordSchema), userControllers.changePassword);
userRoutes.patch('/profile/:id', verifyAuth, validateRequest(userValidator.updateUserSchema), userControllers.updateProfile);

export default userRoutes;
