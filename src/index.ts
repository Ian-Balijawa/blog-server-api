require('dotenv').config();
import mongoose from 'mongoose';
import { cpus } from 'os';
import cluster from 'cluster';
import process from 'process';

import { app } from './app';

const startUp = async () => {
	if (!process.env.JWT_KEY) {
		console.error('FATAL ERROR !: JWT_KEY is not defined');
		process.exit(1);
	}
	if (!process.env.MONGO_URI) {
		console.error('FATAL ERROR !: MONGO_URI must be defined');
		process.exit(1);
	}

	if (!process.env.API_VERSION) {
		console.error('FATAL ERROR !: API_VERSION must be defined');
		process.exit(1);
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log(`Connected MongoDB at instance: ${process.env.MONGO_URI}`);
	} catch (err) {
		console.error(err);
	}

	if (cluster.isMaster) {
		console.log(`Master cluster with pid ${process.pid} is running`);

		for (let i = 0; i < cpus().length; i++) {
			cluster.fork();
		}

		cluster.on('exit', (worker, code, signal) => {
			console.log(`Worker with pid ${worker.process.pid} died`);
		});
	} else {
		// workers can share my TCP connection and perform IPC between themselves
		// In this case, it's the HTTP server
		// This helps to achieve parallelism.

		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});

		console.log(`Worker ${process.pid} started`);
	}
};


startUp();
