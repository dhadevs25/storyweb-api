import { Router, Request, Response } from "express";

const router = Router();

// Home route
router.get("/", (req: Request, res: Response) => {
    res.json({ 
        message: "Hello World!", 
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

export default router;
