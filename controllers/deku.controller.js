import { Router } from "express";
import { sql } from "../db/db.js";


export const postTransactions = async (req, res, next) => {
    try {
        const { title, amount, category, user_id } = req.body;

        const missing = [
            !title && "title",
            !amount && "amount",
            !category && "category",
            !user_id && "user_id",
        ].filter(Boolean).join(", ");

        if (!title || amount == undefined || !category || !user_id) {
            res.status(400).json({
                message: `Missing fields: '${missing}' in request body`
            })
        }

        const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `

        res.status(201).json({
            message: "transaction created successfully",
            transaction: transaction[0]
        })

        next()
    } catch (error) {
        console.error("Error creating the transaction");
        res.status(500).json({
            message : "Internal Error Occured"
        })
    }
}

export const getTransactionById = async (req, res, next) => {
    try {
        const paramId = req.params.id;

        const transactions = await sql`
            SELECT *
            FROM transactions
            WHERE user_id = ${paramId}
            ORDER BY created_at DESC
        `

        res.status(200).json({
            transactions: transactions
        })
        
        next()
    } catch(error) {
        console.error("Error fetching the transactions", error);
        res.status(500).json({
            message : "Internal Error Occured",
        })
    }
}

export const deleteTransactionsById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({
                message: "Provided id is not a number"
            })
        }

        const trans_result = await sql`
            DELETE FROM transactions
            WHERE id = ${id}
            RETURNING *
        `

        if (trans_result.length === 0) {
            return res.status(404).json({
                message: "Transaction not found"
            })
        }

        res.status(200).json({
            message: "Transaction successfully deleted"
        })

        next()
    } catch(error) {
        console.error("Error deleting the transactions", error);
        res.status(500).json({
            message : "Internal Error Occured",
        })
    }
}

export const getSummaryDetailsById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance
            FROM transactions
            WHERE user_id = ${id}
        `

        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as income
            FROM transactions
            WHERE user_id = ${id}
            AND amount > 0
        `

        const expensesResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as expenses
            FROM transactions
            WHERE user_id = ${id}
            AND amount < 0
        `
        // income is + values, so amount > 0, expense is - values so amount < 0

        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses
        })
    } catch(error) {
        console.error("Error getting user transactions summary", error);
        res.status(500).json({
            message : "Internal Error Occured",
        })
    }
}