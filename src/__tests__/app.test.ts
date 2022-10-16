import dotenv from 'dotenv';
dotenv.config();

import { PetsBackendApp } from '../server';
import { MongoDB } from '../mongo';

import request from 'supertest';

let application: string;
let applicationInstance: PetsBackendApp;
let mongoConnection: MongoDB;

beforeAll(async () => {
	mongoConnection = new MongoDB();
	await mongoConnection.start();

	applicationInstance = new PetsBackendApp();
	application = await applicationInstance.start();
});

afterAll(async () => {
	await mongoConnection.stop();
	await applicationInstance.stop();
});

describe(`'pet' endpoint`, () => {
	it('GET /', async () => {
		const response = await request(application).get('/api/v1/pet');

		expect(response.statusCode).toBe(200);

		expect(response.body).toEqual([
			{
				_id: '61ae8e4741b9674cdd427efa',
				createdAt: '2021-12-06T22:27:19.247Z',
				gender: 'female',
				name: 'Maky',
				updatedAt: '2021-12-06T22:27:19.247Z'
			},
			{
				_id: '61ae8e4e41b9674cdd427efc',
				createdAt: '2021-12-06T22:27:26.373Z',
				gender: 'male',
				name: 'Logan',
				updatedAt: '2021-12-06T22:27:26.373Z'
			}
		]);
	});
});
