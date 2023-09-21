import express from "express";
import mongoose from "mongoose";
import apiRoute, { apiProtected } from "./routes/api.js";
import { DB_CONNECT } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/auth.js";
import cors from 'cors';

const app = express();

mongoose.connect(DB_CONNECT, { useNewUrlParser: true }).then(() => {
    console.log(" Connected to the database MangoDB!")
}).catch(err => console.log(err));

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/', apiRoute);
app.use('/api/', AuthMiddleware, apiProtected);

app.listen(PORT, () => console.log('server is running'));