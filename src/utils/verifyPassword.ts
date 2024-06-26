import bcrypt from 'bcrypt';
import APIError from '../errorHandler/APIError';

/**
 * @param password
 * @param hashedPassword
 */
const verifyPassword = async (password: string, hashedPassword: string) => {
  const matchedPassword = await bcrypt.compare(password, hashedPassword);

  if (!matchedPassword) {
    throw new APIError(400, 'Authentication failed!', 'WrongCredentials');
  }
};

export default verifyPassword;
