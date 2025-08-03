import { Router, Request, Response } from "express";
import mongoose from "mongoose";

const router = Router();

// Health check endpoint
router.get("/", (req: Request, res: Response) => {
    const dbStatus = mongoose.connection.readyState === 1; // 1 = connected
    
    res.status(dbStatus ? 200 : 503).json({ 
        status: dbStatus ? "OK" : "SERVICE_UNAVAILABLE",
        timestamp: new Date().toISOString(),
        services: {
            database: dbStatus ? "healthy" : "unhealthy"
        },
        uptime: process.uptime()
    });
});

// Detailed health check
router.get("/detailed", (req: Request, res: Response) => {
    const dbStatus = mongoose.connection.readyState === 1;
    
    res.status(dbStatus ? 200 : 503).json({ 
        status: dbStatus ? "OK" : "SERVICE_UNAVAILABLE",
        timestamp: new Date().toISOString(),
        services: {
            database: dbStatus ? "healthy" : "unhealthy"
        },
        system: {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            platform: process.platform,
            nodeVersion: process.version
        }
    });
});

export default router;
