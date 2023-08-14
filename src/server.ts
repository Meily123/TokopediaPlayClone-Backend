import router from "./router";

require('dotenv').config();

import connect from "./config/database/mongo";
import express from "express";
import { createServer } from "http"; // Use the `createServer` function from Node's http module
import * as io from "socket.io";
import commentRepository from "./video/comment/comment.repository";
import videoRepository from "./video/video.repository"; // Import the socket.io types

const auth = require("./middleware/authentication/auth");
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();
const server = createServer(app); // Use `createServer` to create the server instance

const ioInstance = new io.Server(server, {
    cors: {
        origin: '*', // Replace with the actual origin(s) you want to allow
        methods: ['GET', 'POST'],
    },
});

connect();

// @ts-ignore
app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

ioInstance.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', async (videoId) => {
        console.log('A user connected to room', videoId);
        // Join the room for the specific video
        socket.join(videoId);

        // Emit existing comments for the video to the connected user
        const comments = await commentRepository.getCommentsByVideoId(videoId);
        socket.emit('comments', comments || []);
    });

    socket.on('newComment', async (data) => {
        const {videoId, username, comment} = data;
        console.log ('New comment for video', videoId, ':', username, ':', comment);

        // Store the comment in your database or in-memory storage
        const video = await videoRepository.getVideoById (videoId);
        const NewComment = await commentRepository.createComment (video.id, username, comment);
        console.log(NewComment);

        // Emit the new comment to the specific room (video)
        ioInstance.to (videoId).emit ('newComment', NewComment);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.use(cors());
app.use(router);

server.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
