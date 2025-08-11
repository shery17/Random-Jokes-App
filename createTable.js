import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

async function createTable() {

    const db = await open({                  // Open (or create if it doesn’t exist) the SQLite database file named "database.db"
        filename: path.join('database.db'),  // file named 'database.db' created in same directory when run
        driver: sqlite3.Database             // sqlite3 driver brings some methods we can use
    })

    // tells database to execute some sql queries
    await db.exec(`
        CREATE TABLE IF NOT EXISTS jokes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            setup TEXT NOT NULL,
            punchline TEXT NOT NULL
        )
    `)

    await db.close() // close connection to sqlite db (.close is a function from sqlite3 driver)
    console.log('table created')
}

createTable() // calls function immediately when this file is run