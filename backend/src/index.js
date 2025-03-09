import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server, io } from './lib/socket.js';
dotenv.config();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: 'https://chat-app-five-dusky-86.vercel.app',
    credentials: true,
}));

app.options('*', cors());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`App listening on port ${PORT} 🚀`);
    connectDB();
});