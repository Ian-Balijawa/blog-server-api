import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import { NotFoundError } from './errors';
import {
	currentUserRouter,
	signinRouter,
	signoutRouter,
	signupRouter,
	deleteBlogRouter,
	editBlogRouter,
	newBlogRouter,
	showBlogRouter,
} from './routes';

import { errorHandler } from './middlewares';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.xssFilter());
app.disable('X-Powered-By');

// setup auth-routes for the application
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// setup blog-routes for the application
app.use(deleteBlogRouter);
app.use(editBlogRouter);
app.use(newBlogRouter);
app.use(showBlogRouter);

app.use(errorHandler);

app.all('*', async (req, res) => {
	throw new NotFoundError('Resource or route to resource not found');
});

export { app };
