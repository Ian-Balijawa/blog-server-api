import express from 'express';

const router = express.Router();

const api = process.env.API_VERSION! || 'api';

router.post(`/${api}/users/signout`, (req, res) => {
	req.session = null;

	return res.send({});
});

export { router as signoutRouter };
