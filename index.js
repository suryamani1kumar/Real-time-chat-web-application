const express = require('express');
const http = require('http')
const { Server } = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = new Server(server);
const { v4: uuidv4 } = require("uuid");


// static file
app.use(express.static('public'))
// app.use('/css', express.static(__dirname + 'public/css'))






// for set ejs
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/home', (req, res) => {
    res.render('home')
})




app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html')
})




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
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




















































server.listen(5001, () => console.log(`port is listen on 5001`));
// app.listen(5001, () => console.log(`port is listen on 5001`));