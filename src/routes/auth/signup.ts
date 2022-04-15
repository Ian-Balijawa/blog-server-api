import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors';
import { validateRequest } from '../../middlewares';

import { User } from '../../models/User';
import { PasswordManager } from '../../services';

const router = express.Router();

const version = process.env.API_VERSION! || 'api';

router.post(
	`/${version}/users/signup`,
	[
		body('email').isEmail().withMessage('Email must be valid').trim(),
		body('password')
			.trim()
			.isLength({ min: 5, max: 26 })
			.withMessage('Password must be between 5 and 26 characters long'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		let { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError('Email Already Registered');
		}
		password = await PasswordManager.toHash(password);
		const user = User.build({
			email,
			password,
		});

		await user.save();

		const userJwt = User.generateAuthenticationToken(user);

		req.session = { jwt: userJwt };

		return res.status(201).send(user);
	}
);

export { router as signupRouter };
