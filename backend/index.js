import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import quizRoute from "./routes/quizRoute.js";




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB();



// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use("/api/quiz", quizRoute);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
