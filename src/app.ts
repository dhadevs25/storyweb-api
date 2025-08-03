import express from "express";
import compression from "compression"; 
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import cors from "cors";
import helmet from "helmet";
import instanceMongoDb from "./configs/database";
import { configureRoutes } from "./routes";

const app  = express();

mongoose.Promise = bluebird;

// Database connection is handled in the database config file

app.set("port", process.env.PORT || 3000);

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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

export default app;