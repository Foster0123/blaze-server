import db from "src/configs/db.config.js";

const getLoginData = async (req, res) => {
    const { email, password } = req.body;

    const data = await db
        .query('SELECT * FROM users WHERE email=? AND passcode=?', [email, password])
        .then(data => data)
        .catch(err => console.error(err))

    if (data[0][0]) {
        res.send({ authenticated: true })
    }
    else {
        res.send({ authenticated: false })
    }
}

const getLoginById = (req, res) => {
    console.log("Working")
    res.send({ value: req.params.id })
}

export { getLoginData, getLoginById }
