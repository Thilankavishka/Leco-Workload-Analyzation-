/**
 * index.ts
 * 
 * @update 11/03/2025
 */
import express, { Application } from "express"
import http from "http"
import bodyParser, { json } from "body-parser"
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config()

const app: Application = express()
app.use(json())

app.use(cors({ credentials: true }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// routes


const server = http.createServer(app)
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
