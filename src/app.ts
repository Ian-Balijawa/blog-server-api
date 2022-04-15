import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundError } from './errors';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHander } from './middleware';

// @depricated -> just use express.json() middleware
// import {json} from "body-parser"

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	})
);

// setup routes for the application
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
