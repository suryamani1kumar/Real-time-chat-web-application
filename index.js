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


app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})



app.post('/registration', async (req, res) => {
    const { name, username, password, email, } = req.body
    const Password = await bcrypt.hash(password, 10)

    if (!username || typeof username !== 'string') {
        return res.json({
            status: 'error',
            error: 'Invalid username'
        })
    }
    if (!password || typeof password !== 'string') {
        return res.json({
            status: 'error',
            error: 'Invalid password'
        })
    }
    if (password.length <= 6) {
        return res.json({
            status: 'error',
            error: 'password too small. Should be at least 6 characters'
        })
    }
    try {
        const Detail = await userDetail.create({
            username, email, name, Password
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
















































server.listen(5001, () => console.log(`port is listen on 5001`));
// app.listen(5001, () => console.log(`port is listen on 5001`));