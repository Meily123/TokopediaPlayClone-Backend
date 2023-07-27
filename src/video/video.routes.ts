// src/video/video.routes.ts
import express from 'express';
import bodyParser from 'body-parser';
import videoController from './video.controller';

const router = express.Router();
const auth = require("../middleware/authentication/auth");

router.use(bodyParser.json());

router.post('/', auth, videoController.createVideo);
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.post('/:videoId/product/:productId', videoController.addProductToVideoById);
router.post('/:videoId/comments', auth, videoController.createCommentForVideo);

export default router;
