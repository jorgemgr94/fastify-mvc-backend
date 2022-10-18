import fastify, { FastifyInstance } from 'fastify';

import petRouter from './routes/pets.route';

export class PetsBackendApp {
	server: FastifyInstance;

	async start() {
		this.server = fastify({
			logger: true
		});

		this.registerRoutes();

		const API_PORT = process.env.API_PORT;

		console.log(`Server starting on port ${API_PORT}`);
		return await this.server.listen({
			port: Number(API_PORT),
			host: '0.0.0.0'
		});
	}

	async stop() {
		await this.server.close();
	}

	// async startSubscribers() { this.configureEventBus //  rabbitMQConnection }
	// async stopSubscribers() {}

	registerRoutes() {
		this.server.register(petRouter, { prefix: '/api/v1/pet' });

		// TODO: discover these registers
		// server.register(require('@fastify/formbody@6.0.0'))
		// server.register(require('fastify-cors'))
		// server.register(require('fastify-helmet'))

		// TODO: understand error handler
		// this.server.setErrorHandler((error, request, reply) => {
		// 	this.server.log.error(error);
		// });
	}
}
