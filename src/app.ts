import express from "express";
import compression from "compression"; 
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import instanceMongoDb from "./configs/database";
import { configureRoutes } from "./routes";

// Debug environment detection
console.log(`🔍 NODE_ENV detected: "${process.env.NODE_ENV}"`);
console.log(`🔍 Available environment variables: ${Object.keys(process.env).filter(key => key.includes("NODE")).join(", ")}`);

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
console.log(`📁 Loading environment file: ${envFile}`);
dotenv.config({ path: envFile });

const app  = express();

mongoose.Promise = bluebird;

// Database connection is handled in the database config file

app.set("port", process.env.PORT || 3000);

// Validate required environment variables
if (!process.env.SESSION_SECRET) {
    console.warn("⚠️  SESSION_SECRET not set, using default (not secure for production!)");
    process.env.SESSION_SECRET = "default-session-secret-change-in-production";
}

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