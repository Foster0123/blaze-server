// NPM Packages
import 'dotenv/config'
import express, { Router } from 'express'
import cors from 'cors'

// Configurations
import server from './configs/server.config.js'

// Routers
import homeRouter from './modules/home/home.router.js'
import loginRouter from './modules/login/login.router.js'

// Globals
const app = express()
const router = Router()

// Registered Features
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Registered Routes
app.use((req, _, next) => {
    console.log(`METHOD : ${req.method} | URL : ${req.url}`)
    next()
})
app.use(router)
router.use('/home', homeRouter)
router.use('/login', loginRouter)

app.listen(process.env.APP_PORT, server)
