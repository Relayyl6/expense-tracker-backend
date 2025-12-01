import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import { initDatabase } from "./db/db.js";
import appRouter from "./routes/deku.routes.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();

// middlewares
app.use(cookieParser());

app.use(rateLimiter);

app.use(express.json());


app.use("/api/v1/transactions", appRouter);



initDatabase().then(() => {
    app.listen(PORT, (req, res) => {
        console.log(`Server is running on PORT: localhost:${PORT}`);
    })
})