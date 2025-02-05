import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import notFound from './app/middleware/notFound';
import routes from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Welcome route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to our Blog Pedia API',
    version: '1.0.0',
    success: true,
  });
});

// application routes
app.use('/api', routes);

// not found handler
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
