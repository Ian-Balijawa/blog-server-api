import 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';

const startUp = async () => {
	if (!process.env.JWT_KEY) {
		console.error('FATAL ERROR!: JWT_KEY is not defined');
		process.exit(1);
	}
	if (!process.env.MONGO_URI) {
		console.error('FATAL ERROR!: MONGO_URI must be defined');
		process.exit(1);
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log(`Connected MongoDB at instance: ${process.env.MONGO_URI}`);
	} catch (err) {
		console.error(err);
	}

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
};

startUp();
