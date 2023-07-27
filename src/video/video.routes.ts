import express from 'express';
import bodyParser from 'body-parser';
import videoController from './video.controller';

const router = express.Router();
const auth = require("../middleware/authentication/auth");

router.use(bodyParser.json());

router.post('/', auth, videoController.createVideo);
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.get('/:videoId/product', videoController.getProductsByVideoId);
router.post('/:videoId/product', videoController.addProductToVideoById);
router.post('/:videoId/comments', auth, videoController.createCommentForVideo);
router.get('/:videoId/comments', videoController.getCommentsForVideo);

export default router;
