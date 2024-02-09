import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connection from './configs/db.config.js'
import server from './configs/server.config.js'

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get("/", async (_, res) => {
    const statement = 'SELECT * FROM users';
    const data = await connection.query(statement)
    res.send(data[0]);
})

app.get("/:id", async (req, res) => {
    const id = req.params.id;
    const statement = `SELECT * FROM users WHERE uid=?`
    const data = await connection.query(statement, [id])
    res.send(data[0])
})

app.get("/account", (_, res) => {
    res.sendStatus(200);
})

app.listen(process.env.APP_PORT, server)