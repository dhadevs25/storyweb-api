import logger from "../utils/logger";
import dotenv from "dotenv";
import fs from "fs";

const environment = process.env.NODE_ENV || "development";

// Load environment files dựa vào NODE_ENV
let envFile: string;

if (environment === "production") {
    envFile = ".env.production";
} else if (environment === "development") {
    envFile = ".env.development";
} else {
    envFile = `.env.${environment}`;
}

// Kiểm tra file tồn tại
if (fs.existsSync(envFile)) {
    logger.debug(`Using ${envFile} file to supply config environment variables`);
    dotenv.config({ path: envFile });
} else {
    logger.error(`Environment file ${envFile} not found for ${environment} environment`);
    process.exit(1);
}

interface Config {
    app: {
        environment: "development" | "production" | "test";
        port: number;
    };
    database: {
        uri: string;
    };
    security: {
        sessionSecret: string;
    };
}

function validateConfig(): Config {
    const config: Config = {
        app: {
            environment: environment as Config["app"]["environment"],
            port: parseInt(process.env.PORT || "3000", 10)
        },
        database: {
            uri: process.env.MONGODB_URI as string
        },
        security: {
            sessionSecret: process.env.SESSION_SECRET as string
        }
    };

    // Validate required fields
    const requiredFields = [
        { path: "database.uri", value: config.database.uri, envVar: "MONGODB_URI" },
        { path: "security.sessionSecret", value: config.security.sessionSecret, envVar: "SESSION_SECRET" }
    ];
    
    for (const field of requiredFields) {
        if (!field.value) {
            logger.error(`Missing required environment variable: ${field.envVar}`);
            process.exit(1);
        }
    }

    logger.info(`Environment: ${config.app.environment}`);
    logger.debug(`Port: ${config.app.port}`);
    logger.debug(`Database configured: ${config.database.uri ? "✓" : "✗"}`);

    return config;
}

const config = validateConfig();

export default config;