import { Express } from "express";
import homeRoutes from "./home";
import healthRoutes from "./health";

/**
 * Configure all application routes
 * @param app Express application instance
 */
export const configureRoutes = (app: Express): void => {
    // Home routes
    app.use("/", homeRoutes);
    
    // Health check routes
    app.use("/health", healthRoutes);
    
    // 404 handler - must be last
    app.use((req, res) => {
        res.status(404).json({ 
            error: "Route not found",
            message: `Cannot ${req.method} ${req.path}`,
            timestamp: new Date().toISOString()
        });
    });
};

export default configureRoutes;
