import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './modules/auth/authRoutes';
import subjectRoutes from './modules/subjects/subjectRoutes';
import videoRoutes from './modules/videos/videoRoutes';
import progressRoutes from './modules/progress/progressRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

/*
Allow frontend (Next.js) to call backend
*/
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

/*
Health check route
*/
app.get('/', (req, res) => {
    res.json({ message: 'LMS Backend Running 🚀' });
});

/*
Temporary mock courses (for frontend testing)
*/
app.get('/api/mock/subjects', (req, res) => {
    res.json([
        {
            id: 1,
            title: "Machine Learning Basics",
            description: "Introduction to ML concepts",
            instructor: "Andrew Ng",
            price: 0
        },
        {
            id: 2,
            title: "Full Stack Web Development",
            description: "Learn React, Node, and databases",
            instructor: "John Doe",
            price: 0
        }
    ]);
});

/*
API routes
*/
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/progress', progressRoutes);

/*
Error handler
*/
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app;


