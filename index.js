const express = require('express');
const bodyParser = require('body-parser')
const http = require('http')
const { Server } = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = new Server(server);
// const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const mongoose = require("mongoose");
const userDetail = require('./model/registration');
const jwt = require('jsonwebtoken')


const JWT_SECRET = 'abc@#12sury8427kumar!maniljg'

// static file
app.use(express.static('public'))
// app.use('/css', express.static(__dirname + 'public/css'))
app.use(bodyParser.json())


mongoose.connect(`mongodb+srv://suryamani:ukyHynoxZHmmNUkD@portfoliosuryamani.j1vzhgp.mongodb.net/?retryWrites=true&w=majority`)
    .then(res => console.log('db connect'))


// for set ejs
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/home', (req, res) => {
    res.render('home')
})




app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html')
})

app.get('/registration', (req, res) => {
    res.sendFile(__dirname + '/views/registration.html')

})




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
// for real time chat web application code 
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    })
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})


app.post('/registration', async (req, res) => {
    const { name, username, password: plaintextpassword, email, } = req.body

    if (!username || typeof username !== 'string') {
        return res.json({
            status: 'error',
            error: 'Invalid username'
        })
    }
    if (!plaintextpassword || typeof plaintextpassword !== 'string') {
        return res.json({
            status: 'error',
            error: 'Invalid password'
        })
    }
    if (plaintextpassword.length <= 6) {
        return res.json({
            status: 'error',
            error: 'password too small. Should be at least 6 characters'
        })
    }

    const password = await bcrypt.hash(plaintextpassword, 10)

    try {
        const Detail = await userDetail.create({
            username, email, name, password
        })
        console.log('Detail', Detail)
    }
    catch (err) {
        // console.log('error', err.message)
        // console.log(JSON.stringify(err))
        if (err.code === 11000) {
            //duplicate key
            return res.json({ status: 'error', err: 'Username already  use' })
        }
        throw err
    }
    res.json({ status: 'ok' })
})




app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})

//client ->server: Your client *somehow* as to authenticate who it is
//why -> server is a central computer which You control
//client (jhon)->a computer which you do not control

//1. client proves itself somehow on the secret/date is non changeable (jwt)
//2. client-Server share a secret (Cookie)

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await userDetail.findOne({ username }).lean()  //recevied json represtation of object

    if (!user) {
        return res.json({ status: 'ok', error: 'Invaild username/password' })
    }
    if (await bcrypt.compare(password, user.password)) {
        // the username, password combination is sucessful

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET
        )
        return res.json({ status: 'ok', data: token })

    }

    res.json({ status: 'error', error: 'Invalid username/password' })
})

app.get('/change-password', (req, res) => {
    res.sendFile(__dirname + "/views/change-password.html")

})
app.post('/change-password', (req, res) => {
    const { token } = req.body
    const user = jwt.verify(token, JWT_SECRET)
    console.log(user)

})



server.listen(5001, () => console.log(`port is listen on 5001`));
// app.listen(5001, () => console.log(`port is listen on 5001`));