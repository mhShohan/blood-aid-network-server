import { Request, Response } from 'express';
import STATUS from '../lib/httpStatus';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const healthCheckRoute = async (_req: Request, res: Response) => {
  const data = await prisma.liveDB.findMany();

  return res.status(STATUS.OK).json({
    success: true,
    statusCode: STATUS.OK,
    message: 'Server is running...',
    data
  });
};

export default healthCheckRoute;
