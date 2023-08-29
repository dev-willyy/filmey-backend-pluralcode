'use strict';

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { authRouter } from './routes/auth.js';

const app = express();
const port = process.env.port || 3003;

// defaults
dotenv.config();
express.json();
app.use(cors());

// Connect to Database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    // throw err;
    throw new Error(err);
  }
}

// Logs a message if Database connection disconnects;
mongoose.connection.on('disconnected', () => {
  console.log('Connection has broken');
});

app.use('/pluraltask', authRouter);
app.use('/pluraltask', authRouter);
app.use('/pluraltask', authRouter);

app.get('/', (req, res) => {
  res.send('This is the Home Route');
});

app.listen(port, (err) => {
  connectDB();
  if (err) console.error(err);
  console.log(`express server is running at port ${port}`);
});
