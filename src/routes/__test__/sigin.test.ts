import request from 'supertest';
import { app } from '../../app';

const version = process.env.API_VERSION!;

it('should fail when an email that doesnot exist is supplied', async () => {
	const response = await request(app)
		.post(`/${version}/users/signin`)
		.send({
			email: 'invalid@invalid.com',
			password: 'validpassword',
		})
		.expect(400);
});

it('should fail when an incorrect password is supplied', async () => {
	await request(app)
		.post(`/${version}/users/signup`)
		.send({
			email: 'test@test.com',
			password: 'correctpassword',
		})
		.expect(201);

	await request(app)
		.post(`/${version}/users/signin`)
		.send({
			email: 'test@test.com',
			password: 'incorrectpassword',
		})
		.expect(400);
});

it('should respond with a cookie of given valid credentials', async () => {
	await request(app)
		.post(`/${version}/users/signup`)
		.send({ email: 'test1@test.com', password: 'password' })
		.expect(201);

	const response = await request(app)
		.post(`/${version}/users/signin`)
		.send({ email: 'test1@test.com', password: 'password' })
		.expect(200);

	expect(response.get('Set-Cookie')).toBeDefined();
});
