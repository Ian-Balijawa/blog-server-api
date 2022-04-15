import express from 'express';
import { currentUser } from '../../middlewares';

const router = express.Router();

const version = process.env.API_VERSION! || 'v1';

router.get(`/${version}/users/currentUser`, currentUser, (req, res) => {
	return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
