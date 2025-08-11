import { getDBConnection } from '../db/db.js'

export async function getJokes(req, res) {

  try {

    const db = await getDBConnection()

    const jokes = await db.all('SELECT * FROM jokes') // db.all will gets the array of rows
    await db.close()
    res.json(jokes)

  } catch (err) {

    res.status(500).json({error: 'Failed to fetch jokes', details: err.message})

  }
}

export async function getJokesById(req, res) {

  try {

    const db = await getDBConnection()

    const jokes = await db.get('SELECT * FROM jokes WHERE id = (?)', [req.params.id]) // db.get gets a single row
    await db.close()
    res.json(jokes)

  } catch (err) {

    res.status(500).json({error: 'Failed to fetch joke by id', details: err.message})

  }
}