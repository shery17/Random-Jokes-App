import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

// reusable function to open a connection to the sqlite database
export async function getDBConnection() {

const dbPath = path.join('database.db')

 return open({
   filename: dbPath,
   driver: sqlite3.Database
 }) 

} 
