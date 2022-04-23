const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io'); 
const http = require('http');

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const userRoutes = require('./routes/userRoutes');
const likeRoutes = require('./routes/likeRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/answer', answerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/notification', notificationRoutes);

app.use('/', async (req,res) => {
    res.status(200).send('Hey AskBa');
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

io.on('connection', (socket) => {
    // console.log('user connected: ', socket.id);

    socket.on('register', (id) => {
        socket.join(id);
        console.log('registrovo se sa idom: ', id);
    });

    socket.on('send_notification', (id) => {
        socket.to(id).emit('receive_notification');
    }); 

    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
    });
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => { console.log(`Server running on PORT: ${PORT}`); });