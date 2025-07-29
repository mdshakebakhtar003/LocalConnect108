const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./model/messagemodel'); // New: message model

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Serve uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// RESTful API Routes
const usersRouter = require("./routes/userRoutes");
const workersRouter = require("./routes/workerRoutes");
const booksRouter = require("./routes/bookRoutes");
const otpRouter = require("./routes/otpRoutes");
const rateRouter = require("./routes/rateRoutes");
const messageRoutes = require("./routes/messageRoutes");
app.use("/messages", messageRoutes); // New: message routes

app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to My localhost 12345" });
});

app.use("/user", usersRouter);
app.use("/worker", workersRouter);
app.use("/book", booksRouter);
app.use("/otp", otpRouter);
app.use("/rate", rateRouter);

// ---- Socket.IO Chat Logic ----

const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', ({ roomId, userName }) => {
    socket.join(roomId);
    onlineUsers.set(socket.id, { roomId, userName });

    socket.to(roomId).emit('userOnline', userName);
    io.to(roomId).emit('onlineUsers', [...new Set(
      [...onlineUsers.values()]
        .filter(u => u.roomId === roomId)
        .map(u => u.userName)
    )]);
  });

  socket.on('typing', ({ roomId, userName }) => {
    socket.to(roomId).emit('userTyping', userName);
  });

  socket.on('stopTyping', ({ roomId, userName }) => {
    socket.to(roomId).emit('userStopTyping', userName);
  });

  socket.on('sendMessage', async ({ roomId, sender, text }) => {
    const newMessage = new Message({ roomId, sender, text });
    await newMessage.save();
    io.to(roomId).emit('receiveMessage', newMessage);
  });

  socket.on('disconnect', () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      socket.to(user.roomId).emit('userOffline', user.userName);
      onlineUsers.delete(socket.id);

      io.to(user.roomId).emit('onlineUsers', [...new Set(
        [...onlineUsers.values()]
          .filter(u => u.roomId === user.roomId)
          .map(u => u.userName)
      )]);
    }

    console.log('User disconnected:', socket.id);
  });
});

// ---- Start Server ----
const PORT = process.env.PORT || 12345;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
