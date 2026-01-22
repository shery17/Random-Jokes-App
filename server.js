import express from 'express'   // import express from installed dependency
import { jokesRouter } from './routes/jokesRouter.js' // import router

const app = express() // create and store an instance of an express app
const PORT = process.env.PORT || 8000;    // port number to be used for server to listen for requests

app.use(express.static('public'))  // middleware that tells express app to serve the static files in the 'public' folder

app.use('/api/jokes', jokesRouter)  // assign url endpoint and handle with a controller function


app.listen(PORT, "0.0.0.0", () => {  // express app starts to listen for requests objects. Also takes PORT and a callback function as parameter
    console.log(`Server running on port ${PORT}`)    // tells us the server is running and where.
}).on('error', (err) => {  // listens for any errors during server startup. Errors that come up are caught and handled by the callback function
    console.error('Failed to start server:', err) // tells us if the server failed to start and why
})