import { neon } from "@neondatabase/serverless";
import { DB_URL } from "../config/env.js";

let sql;

try {
    sql = neon(DB_URL);
} catch (error) {
    console.error="Error occured while connecting to the database";
    process.exit(1)
}

const initDatabase = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS transactions (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                category VARCHAR(255) NOT NULL,
                created_at DATE NOT NULL DEFAULT CURRENT_DATE
            );
        `

        console.log("Databse initiliased successfully");
    } catch (error){
        console.error("An Error occured while initiliasing the database", error );
        process.exit(1);
    }
}


export { sql, initDatabase };
