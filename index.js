const express = require('express');
const bodyParser = require('body-parser')
const http = require('http')
const { Server } = require('socket.io')
const app = express();
require('dotenv').config()
const server = http.createServer(app)
const io = new Server(server);
// const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const loginRoutes = require('./routes/login')
const registrationRoutes = require('./routes/registration')
const changePasswordRoutes = require('./routes/change-password')

// static file
app.use(express.static('public'))
// app.use('/css', express.static(__dirname + 'public/css'))
app.use(bodyParser.json())


mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}.j1vzhgp.mongodb.net/?retryWrites=true&w=majority`)
    .then(res => console.log('db connect'))

// for set ejs
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/VideoChat', (req, res) => {
    res.sendFile(__dirname + '/views/VideoChat.html')
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


//registration 
app.get('/registration', (req, res) => {
    res.sendFile(__dirname + '/views/registration.html')

})
app.use('/registration', registrationRoutes);


//login 
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})
app.use('/userlogin', loginRoutes);


//changePassword 
app.get('/change-password', (req, res) => {
    res.sendFile(__dirname + "/views/change-password.html")

})
app.use(changePasswordRoutes);


server.listen(process.env.PORT, () => console.log(`port is listen on ${process.env.PORT}`));
// app.listen(5001, () => console.log(`port is listen on 5001`));