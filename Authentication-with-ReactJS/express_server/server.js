const express = require("express");
const db = require("./src/db/database");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv'); dotenv.config();
const { registerValidation, loginValidation } = require('./validation')
const cors = require('cors');


const PORT = 8080; // Server connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const origin = 'http://localhost:3000'; 
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin, access-control-allow-headers");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET");
    next();
});
const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    "preflightContinue": true,
};

// =========================================================POSTS/GETS==================================================================

app.get('/api/candidates', cors(corsOptions), async (req, res) => {
    const header = req.headers.authorization || '';  // get the auth header
    const token = header.split(/\s+/).pop() || '';
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        console.log('token:', token);
        if (err) {
            res.sendStatus(403)
        } else {
            const data = [];
            const sql = `SELECT * FROM candidate`;
            db.all(sql, [], (err, rows) => {
                if (err) return console.log(err.message);
                rows.forEach((row) => {
                    data.push(row);
                });
                return res.status(200).json({ success: true, data })
            })
        }
    })
})

app.post('/api/auth/signup', cors(corsOptions), async (req, res) => {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO user (username, email, password) VALUES(?,?,?)`;

    // Validate before creating a new user
    const result = { success: true };
    const { error } = registerValidation(req.body)

    if (error) { // Check for valid inserts first
        result.success = false;
        result.message = error.details[0].message
        return res.status(200).json({ result });
    } else if (result.success) {
        // Create new user and token
        db.run(sql, [username, email, hash], (err) => {
            if (err) { console.error(err.message);
                result.success = false;
                result.message = 'This username already exists, try another one.'
                return res.status(200).json({ result })
            }
            const token = jwt.sign(
                { username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 360000 })
    
            result.token = token
            res.status(200).json({ result });
            console.log('A new row was created inside "user" table.');
        });
    }

    
})

app.post('/api/auth/signin', cors(corsOptions), async (req, res) => {

    const { username, password } = req.body;
    const sql = "SELECT username, password FROM user WHERE username='" + username + "'";
    const result = {}

    db.each(sql, async (err, row) => {
        // Validate
        const { error } = loginValidation(req.body)
        const validPass = await bcrypt.compare(password, row.password)
        if (error) { // Check for valid inserts first
            result.success = false;
            result.message = error.details[0].message
            console.log(result.message);
            res.status(200).json({ result });
            return
        } else if (validPass) { // If the password matches, log in 
            const token = jwt.sign(
                { username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 360000 })
            result.success = true
            result.token = token
            res.status(200).json({ result });
        } else {
            result.success = false
            result.message = 'Password invalid'
            console.log(result.message);
            res.status(200).json({ result });
        }
    })
})