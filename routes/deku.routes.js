import { Router } from "express";
import { sql } from "../db/db.js";
import { postTransactions, getTransactionById, deleteTransactionsById, getSummaryDetailsById } from "../controllers/deku.controller.js";

const appRouter = Router();

appRouter.post("/", postTransactions)

appRouter.get("/:id", getTransactionById)

appRouter.delete("/:id", deleteTransactionsById)

appRouter.get("/summary/:id", getSummaryDetailsById)

export default appRouter