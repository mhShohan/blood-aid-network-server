import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import APIError from '../errorHandler/APIError';

type TAdminRole = 'USER' | 'ADMIN'

const verifyRole = (allowedRoles: TAdminRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const role: TAdminRole = req.user.role;

    console.log(role)

    if (allowedRoles.includes(role)) {
      next();
    } else {
      throw new APIError(httpStatus.FORBIDDEN, 'Forbidden access!', 'FORBIDDEN');
    }
  };
};

export default verifyRole;
