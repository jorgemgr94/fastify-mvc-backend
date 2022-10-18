import dotenv from 'dotenv';
dotenv.config();

import { PetsBackendApp } from './server';
import { MongoDB } from './mongo';
import * as RedisConnection from './redis';

async function main() {
	await RedisConnection.start();

	const mongoConnection = new MongoDB();
	await mongoConnection.start();

	const application = new PetsBackendApp();
	await application.start();
}

main();
