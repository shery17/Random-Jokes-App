import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { jokesData } from './fetchJokesData.js'

async function seedTable() {

  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

  try {

    await db.exec('BEGIN TRANSACTION') // tells sqlite to group the sql statements below before committing them

    for (const { type, setup, punchline } of jokesData) {   // destructure property values from each object in jokesData to use as local variables
      await db.run( // run sql queries to sqlite db
        `INSERT INTO jokes (type, setup, punchline)
        VALUES (?, ?, ?)`,
        [type, setup, punchline] // replace placeholder values in prepared statement
      )
    }
    
    await db.exec('COMMIT') // prepared sql queries are ready, commit to run them all at once.
    console.log('All records inserted')

  } catch (err) {

    await db.exec('ROLLBACK') // if there is an error implementing a part of the data, delete the previously inserted data.
    console.log('Error inserting data', err.message)

  } finally {

    await db.close() // close the connection to the database
    console.log('connection closed')

  }

}

seedTable() // run seedTable() as soon as this file when file is run