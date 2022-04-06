import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}

	if (!process.env.MONGO_USERNAME) {
		throw new Error('MONGO_USERNAME must be defined');
	}
	if (!process.env.MONGO_PASSWORD) {
		throw new Error('MONGO_PASSWORD must be defined');
	}

	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.laxgb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
		);

		console.log('Connected to MongoDB');
	} catch (err) {
		console.log(err);
	}
};

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

start();
