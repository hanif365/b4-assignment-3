import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import notFound from './app/middleware/notFound';
import routes from './app/routes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  }),
);

// Welcome route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to our Blog Pedia API',
    version: '0.0.1',
    success: true,
  });
});

// application routes
app.use(routes);

// not found handler
app.use(notFound);

export default app;
