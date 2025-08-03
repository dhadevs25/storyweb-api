import mongoose from "mongoose";
import logger from "../utils/logger";
import config from "./secrets";


class Database {
    private static instance: Database;
    private isConnected = false;

    constructor() {
        this.setupEventListeners();
    }

    private setupEventListeners() {
        // Connection events
        mongoose.connection.on("connected", () => {
            this.isConnected = true;
            logger.info("MongoDB connected successfully");
        });

        mongoose.connection.on("error", (error) => {
            this.isConnected = false;
            logger.error("MongoDB connection error:", error);
        });

        mongoose.connection.on("disconnected", () => {
            this.isConnected = false;
            logger.warn("MongoDB disconnected");
        });

        // Graceful shutdown
        process.on("SIGINT", this.gracefulShutdown.bind(this));
        process.on("SIGTERM", this.gracefulShutdown.bind(this));
    }

    async connect(): Promise<void> {
        try {
            if (!config.database.uri) {
                throw new Error("MONGODB_URI is not defined");
            }

            if (this.isConnected) {
                logger.info("Database already connected");
                return;
            }

            // Connection options
            const options = {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4,
                retryWrites: true,
                w: "majority" as const
            };

            // Enable debug mode in development
            if (process.env.NODE_ENV !== "production") {
                mongoose.set("debug", true);
            }

            await mongoose.connect(config.database.uri, options);

        } catch (error) {
            logger.error("Failed to connect to MongoDB:", error);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
            this.isConnected = false;
            logger.info("MongoDB disconnected successfully");
        } catch (error) {
            logger.error("Error disconnecting from MongoDB:", error);
            throw error;
        }
    }

    private async gracefulShutdown(): Promise<void> {
        logger.info("Received shutdown signal, closing MongoDB connection...");
        try {
            await this.disconnect();
            process.exit(0);
        } catch (error) {
            logger.error("Error during graceful shutdown:", error);
            process.exit(1);
        }
    }

    getConnectionStatus(): boolean {
        return this.isConnected;
    }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();

// Initialize connection
instanceMongoDb.connect().catch((error) => {
    logger.error("Failed to initialize database connection:", error);
    process.exit(1);
});

export default instanceMongoDb;
