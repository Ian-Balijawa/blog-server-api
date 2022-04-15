import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = 'Error Connecting To Database';

	constructor() {
		super('Error connecting to database');

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors() {
		return [{ message: this.reason }];
	}
}
