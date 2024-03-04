import connection from 'src/configs/db.config.js'

const fetchAllData = async (req, res) => {
    const statement = 'SELECT * FROM users'
    const data = await connection.query(statement)
    res.send(data[0])
}

const fetchById = async (req, res) => {
    const id = req.params.id
    const statement = `SELECT * FROM users WHERE uid=?`
    const data = await connection.query(statement, [id])
    res.send(data[0])
}
export { fetchAllData, fetchById }
