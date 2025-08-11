import express from 'express'
import { getJokes, getJokesById } from '../controllers/jokesControllers.js'

export const jokesRouter = express.Router()  // creates an instance of express app router

// routes following restful standards
// get random joke functionality handled by frontend
jokesRouter.get('/', getJokes)
jokesRouter.get('/:id', getJokesById)