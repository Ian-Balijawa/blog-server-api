import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.jwt) {
		return next();
	}
	console.log(req.session?.jwt);

	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KET!
		) as UserPayload;

		req.currentUser = payload;
		console.log(req.session?.jwt);
		console.log(payload);
	} catch (err) {
		console.error(`Error verifying auth Token, ${err}`);
	}

	return next();
};
