import request from 'supertest';
import { app } from '../../app';

const version = process.env.API_VERSION!;

it('should clear the cookie after successful signing out', async () => {
	//this test requires us to first signup for an account and then try to signout

	await request(app)
		.post(`/${version}/users/signup`)
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);

	const response = await request(app)
		.post(`/${version}/users/signout`)
		.send({})
		.expect(200);

	expect(response.get('Set-Cookie')).toEqual([
		'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
	]);
});
