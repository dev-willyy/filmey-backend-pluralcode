'use strict';

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerDoc from 'swagger-ui-express';
import swaggerDocumentation from './helpers/documentation.js';
import { authRouter } from './routes/auth.js';
import { userRouter } from './routes/users.js';

const app = express();
const port = process.env.port || 3003;

// defaults
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Api documentation with Swagger
app.use('/documentations', swaggerDoc.serve);
app.use('/documentations', swaggerDoc.setup(swaggerDocumentation));

// Connect to Database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    throw new Error(err);
  }
}

// Logs a message if Database connection disconnects;
mongoose.connection.on('disconnected', () => {
  console.log('Connection has broken');
});

app.use('/api/pluraltask', authRouter);
app.use('/api/pluraltask/users', userRouter);

// Error stack for server: takes the return value of the createError function as params
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong with server';

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get('/', (req, res) => {
  res.send('This is the Home Route');
});

app.listen(port, (err) => {
  connectDB();
  if (err) console.error(err);
  console.log(`express server is running at port ${port}`);
});
