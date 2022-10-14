import dotenv from 'dotenv';
dotenv.config();

import { PetsBackendApp } from './server';
import { MongoDB } from './mongo';

async function main() {
	const mongoConnection = new MongoDB();
	await mongoConnection.start();

	const application = new PetsBackendApp();
	await application.start();
}

main();
