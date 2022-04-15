import express, { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../errors';
import { validateRequest } from '../../middlewares';
import { body } from 'express-validator';

import { User } from '../../models/User';
import { PasswordManager } from '../../services';

const router = express();

const version = process.env.API_VERSION!;

router.post(
	`/${version}/users/signin`,
	[
		body('email').isEmail().withMessage('Email must be valid').trim(),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('You must supply a correct password'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			throw new BadRequestError('Invalid Credentials');
		}

		const isPasswordMatch = await PasswordManager.compare(
			existingUser.password,
			password
		);

		if (!isPasswordMatch) {
			throw new BadRequestError('Invalid Credentials');
		}

		const userJwt = User.generateAuthenticationToken(existingUser);

		req.session = { jwt: userJwt };

		return res.status(200).send(existingUser);
	}
);

export { router as signinRouter };
