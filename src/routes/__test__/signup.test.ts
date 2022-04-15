import request from 'supertest';
import { app } from '../../app';

const version = process.env.API_VERSION!;

it('should return a 201 on a successfull signup', async () => {
	await request(app)
		.post(`/${version}/users/signup`)
		.send({
			email: 'test1@test.com',
			password: 'password',
		})
		.expect(201);
});

it('should return a 400 upon an invalid email', async () => {
	await request(app)
		.post(`/${version}/users/signup`)
		.send({
			email: 'test',
			password: 'password',
		})
		.expect(400);
});

it('should return a 400 upon an invalid passsword', async () => {
	await request(app)
		.post(`/${version}/users/signup`)
		.send({
			email: 'test@test.com',
			password: 'a',
		})
		.expect(400);
});

it('should return a 400 upon missing email and password', async () => {
	await request(app)
		.post(`/${version}/users/signup`)
		.send({ email: '', password: '' })
		.expect(400);
});

it('should return a 400 upon missing email and password', async () => {
	await request(app).post(`/${version}/users/signup`).send({}).expect(400);
});

it('should disallow duplicate emails', async () => {
	await request(app)
		.post(`/${version}/users/signup`)
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201);

	await request(app)
		.post(`/${version}/users/signup`)
		.send({ email: 'test@test.com', password: 'password' })
		.expect(400);
});

it('should set a cookie after a successful signup', async () => {
	const response = await request(app)
		.post(`/${version}/users/signup`)
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201);
	expect(response.get('Set-Cookie')).not.toBeNull();
});
