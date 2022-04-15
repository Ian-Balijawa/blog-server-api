import express from 'express';

const router = express.Router();

const version = process.env.API_VERSION! || 'api';

router.post(`/${version}/users/signout`, (req, res) => {
	req.session = null;

	return res.send({});
});

export { router as signoutRouter };
