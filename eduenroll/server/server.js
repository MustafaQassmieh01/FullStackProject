import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import router from './api/routes/mainRouter.js';
import connection from './config/connection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


export const app = express();


dotenv.config({ path: './.env' });
console.log(process.env.URL);
console.log(process.env.PORT);
const allowedOrigins = [
  'http://localhost:5173',                         // Vite dev server
  'https://your-frontend-url.netlify.app',         // deployed frontend URL
  'https://your-frontend-url.vercel.app',          // if using Vercel
  'https://eduenrollpage.onrender.com',          // if serving frontend from backend
  'https://eduenrollpage.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,   // if you use cookies
}));

connection();
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(logger('dev', { immediate: true }));
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
