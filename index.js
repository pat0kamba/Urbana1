const express = require("express");
const bodyParser = require("body-parser");
// const helmet = require("helmet");
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

// Data from the form
let descr;
let image;
let video;
let type;
let location;
let textChat;
let textArray = [];
let numbers = [];

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended: true}));
// app.use(helmet());

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
  });

app.get("/report", (req, res) => {
  res.render('reporting');
});

app.post("/report", (req, res) => {
    descr = req.body.description;
    image = req.body.image;
    video = req.body.video;
    type = req.body.Types;
    location = req.body.location;
    // console.log(req.body);
    res.redirect('/');
});

app.get("/", (req, res)=>{
    res.send("<h1>Map Page</h1>");
})
app.get("/filter", (req, res) => {
    res.render('filter');
  });

app.get("/chat", (req, res)=>{
    res.render('chat');
    
})

// app.post("/script", (req, res)=>{
//     textChat = req.body.textChat;
//     //number = parseInt(req.body.number);
//     number = 0;
//     console.log(number);
//     number += 1;
//     console.log(number);
//     textArray.push(textChat);
//     numbers.push(number);
//     res.render('chat', {texts: textArray, numbers:numbers});
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});