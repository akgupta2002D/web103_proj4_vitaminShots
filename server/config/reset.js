import './dotenv.js'
import { pool } from './database.js'

async function reset() {
  await pool.query(`
    DROP TABLE IF EXISTS vitamin_shots;
    CREATE TABLE vitamin_shots (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      base_juice TEXT NOT NULL,
      supplement TEXT NOT NULL,
      flavor TEXT NOT NULL,
      benefit TEXT NOT NULL,
      price NUMERIC(5,2) NOT NULL
    );
  `)
  console.log("✅ vitamin_shots table created")
}

reset()
