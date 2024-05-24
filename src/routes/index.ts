import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';
import requestRoutes from '../modules/request/request.routes';

const rootRoutes = Router();

rootRoutes.use('/', userRoutes);
rootRoutes.use('/blood-requests', requestRoutes);

export default rootRoutes;
