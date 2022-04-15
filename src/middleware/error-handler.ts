import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../errors';

export const errorHander = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res
			.status(err.statusCode)
			.send({ errors: err.serializeErrors() });
	}

	console.error(err);

	return res.status(400).send({
		errors: [
			{
				message: 'Something went wrong',
			},
		],
	});
};
