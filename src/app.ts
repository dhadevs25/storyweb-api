import express from "express";
import compression from "compression"; 
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import cors from "cors";
import helmet from "helmet";
import { configureRoutes } from "./routes";
import instanceMongoDb from "./configs/database";
import logger from "./utils/logger";
import { AppError } from "./utils/error";

const app  = express();

mongoose.Promise = bluebird;

app.set("port", process.env.PORT || 3000);

// connect to MongoDB
instanceMongoDb.connect().catch((error) => {
    logger.error("Failed to initialize database connection:", error);
    process.exit(1);
});

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Configure all routes
configureRoutes(app);

// Error handler
app.use((err: AppError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Something went wrong!";
    
    logger.error(err.stack || err.message);
    
    res.status(statusCode).json({ 
        error: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});

export default app;