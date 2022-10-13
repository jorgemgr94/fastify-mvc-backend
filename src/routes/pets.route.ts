import { FastifyInstance } from "fastify";
import * as PetController from "../controllers/pet.controller";

// TODO: understand how preHandler works. 
// TODO: understand how preHandler works. 
async function petRouter(fastify: FastifyInstance) {
	fastify.route({
		method: "GET",
		url: "/",
		handler: PetController.searchAll,
	});

	fastify.route({
		method: "GET",
		url: "/:petId",
		// schema: createPostSchema,
		// preHandler: [checkValidRequest, checkValidUser],
		handler: PetController.searchById,
	});
}

export default petRouter;
