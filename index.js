const express = require('express');
const bodyParser = require('body-parser')
const http = require('http')
const { Server } = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = new Server(server);
const { v4: uuidv4 } = require("uuid");


// static file
app.use(express.static('public'))
// app.use('/css', express.static(__dirname + 'public/css'))
app.use(bodyParser.json())





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




app.post('/registration', (req, res) => {
    console.log(req.body)
})
















































server.listen(5001, () => console.log(`port is listen on 5001`));
// app.listen(5001, () => console.log(`port is listen on 5001`));