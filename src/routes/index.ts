import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';

const rootRoutes = Router();

rootRoutes.use('/', userRoutes);

export default rootRoutes;
