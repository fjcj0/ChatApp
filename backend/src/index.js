import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server, io } from './lib/socket.js';
import path from 'path';

const PORT = process.env.PORT;
const __dirname = path.resolve();

dotenv.config();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.options('*', cors());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, '../../frontend', "dist", "index.html"));
    });
}


server.listen(PORT, () => {
    console.log(`App listening on port ${PORT} 🚀`);
    connectDB();
});


