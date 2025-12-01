import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import { initDatabase } from "./db/db.js";
import appRouter from "./routes/deku.routes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import job from "./config/env.js";

const app = express();

if (process.env.NODE_ENV === "production") job.start()

// middlewares
app.use(cookieParser());

app.use(rateLimiter);

app.use(express.json());

app.use("/api/v1/transactions", appRouter);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
})

initDatabase().then(() => {
    app.listen(PORT, (req, res) => {
        console.log(`Server is running on PORT: localhost:${PORT}`);
    })
})