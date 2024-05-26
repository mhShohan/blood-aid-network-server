import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import config from './config';
import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
import rootRoutes from './routes';
import healthCheckRoute from './routes/heathRoutes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

if (config.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}


// health check route
app.get('/health', healthCheckRoute);

// application routes
app.use('/api/v1', rootRoutes);

//Not Found Route
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
