import request from 'supertest';
import { app } from '../../app';

const version = process.env.API_VERSION!;

it('should respond with details about the current user', async () => {
	const cookie = await global.signin();

	const response = await request(app)
		.get(`/${version}/users/currentUser`)
		.set('Cookie', cookie)
		.send()
		.expect(200);
	expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('should respond with null if the a user is not authenticated or signed in', async () => {
	const response = await request(app)
		.get(`/${version}/users/currentUser`)
		.send()
		.expect(200);

	expect(response.body.currentUser).toBeNull();
});
