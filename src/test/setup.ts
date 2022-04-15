require('dotenv').config();
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
	namespace NodeJS {
		interface Global {
			signin(): Promise<string[]>;
		}
	}
}

beforeAll(async () => {
	process.env.JWT_KEY = 'asdf';
	const mongoUri = process.env.MONGO_URI_TEST!;

	await mongoose.connect(mongoUri);
});

beforeEach(async () => {
	// Get all the collections in the database and wipe out all the exisiting data
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongoose.connection.close();
});

const version = process.env.API_VERSION || 'api';

// Define a global sigin method
global.signin = async () => {
	const email = 'test@test.com';
	const password = 'password';

	const response = await request(app)
		.post(`/${version}/users/signup`)
		.send({ email, password })
		.expect(201);

	const cookie = response.get('Set-Cookie');
	return cookie;
};
