import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Welcome route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Blog Pedia API',
    version: '1.0.0',
    success: true,
  });
});

export default app;
