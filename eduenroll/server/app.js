import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import router from './api/routes/mainRouter.js';
import connection from './config/connection.js';


export const app = express();


dotenv.config({ path: './.env' });
console.log(process.env.URL);
console.log(process.env.PORT);
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // only if you're sending cookies/auth headers
}));

connection();
app.use(express.json());
app.use('/eduenroll/api', router);
app.use(logger('dev', { immediate: true }));
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
