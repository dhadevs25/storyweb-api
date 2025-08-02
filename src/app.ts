import express from 'express';
import compression from "compression"; 
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import bluebird from "bluebird";
import session from "express-session";
import cors from "cors";
import helmet from 'helmet';

import { MONGODB_URI , SESSION_SECRET } from './utils/secrets';

const app  = express();

const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;


mongoose.connect(mongoUrl).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    // process.exit();
});


app.set("port", process.env.PORT || 3000);

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Hello World!", version: "1.0.0" });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler - must be last
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app;