import app from './app';
import connectDB from './app/config/db';
import config from './app/config';

const { port = 5001 } = config;

const bootstrap = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

bootstrap();
