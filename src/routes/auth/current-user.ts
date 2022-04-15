import express from 'express';
import { currentUser } from '../../middlewares';

const router = express.Router();

const api = process.env.API_VERSION! || 'v1';

router.get(`/${api}/users/currentUser`, currentUser, (req, res) => {
	return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
