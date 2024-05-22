import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomError from '../errorHandler/APIError';
import httpStatus from 'http-status';
import config from '../config';

const verifyAuth: RequestHandler = (req, _res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decode = jwt.verify(token, config.JWT_ACCESS_SECRET as string) as JwtPayload;

      req.user = {
        id: decode?.id,
        email: decode?.email,
        name: decode.name,
      };

      next();
    } catch (error) {
      throw new CustomError(httpStatus.UNAUTHORIZED, 'Unauthorize! please login', 'Unauthorize');
    }
  } else {
    throw new CustomError(httpStatus.UNAUTHORIZED, 'Unauthorize! please login', 'Unauthorize');
  }
};

export default verifyAuth;
