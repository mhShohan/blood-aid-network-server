import { ZodError } from 'zod';

const zodErrorSanitize = (err: ZodError) => {
  const message = err.issues.map((issue) => issue.message + '.').join(' ');

  const errorDetails = err.issues.map((error) => ({
    field: error.path[error.path.length - 1],
    message: `${error.message}`,
  }));

  return { message, errorDetails };
};

export default zodErrorSanitize;
