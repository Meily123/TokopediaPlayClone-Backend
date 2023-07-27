// src/video/video.routes.ts
import express from 'express';
import bodyParser from 'body-parser';
import {
    addProductToVideoById,
    createCommentForVideo,
    createVideo,
    getAllVideos,
    getVideoById
} from './video.controller';

const router = express.Router();
const auth = require("../middleware/authentication/auth");

router.use(bodyParser.json());

router.post('/', auth, createVideo);
router.get('/', getAllVideos);
router.get('/:id', getVideoById);
router.post('/:videoId/product/:productId', addProductToVideoById);
router.post('/:videoId/comments', auth, createCommentForVideo);

export default router;
