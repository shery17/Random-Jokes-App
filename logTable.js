import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

async function viewAllJokes() {
  const db = await open({ 
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try { 
    const jokes = await db.all('SELECT * FROM jokes')
    console.table(jokes)

  } catch (err) {
    console.error('Error fetching jokes:', err.message)
  } finally {
    await db.close()
  }
}

viewAllJokes()