import { FastifyReply, FastifyRequest } from 'fastify';
import * as PetService from '../services/pet.service';
import { redisClient } from '../redis';

export const searchAll = async (_: FastifyRequest, reply: FastifyReply) => {
	try {
		const pets = await PetService.getPets();
		reply.code(200).send(pets);
	} catch (err) {
		reply.status(500).send({ message: `Error retrieving Pets: ${err}` });
	}
};

// TODO: move Params type.
export const searchById = async (
	req: FastifyRequest<{ Params: { petId: string } }>,
	reply: FastifyReply
) => {
	try {
		const { petId } = req.params;

		// retrieve from cache
		const petCache = await redisClient.get(petId);
		if (petCache) {
			reply.code(200).send(petCache);
			return;
		}

		// retrieve from mongo
		const pet = await PetService.getPetById(petId);
		if (!pet) reply.code(404).send({ message: 'Pet not found' });

		// set cache value
		await redisClient.set(petId, JSON.stringify(pet), {
			EX: 1000 * 60 * 60 * 1 /*hour (s)*/
		});

		reply.code(200).send(pet);
	} catch (err) {
		reply.status(500).send({ message: `Error retrieving Pets: ${err}` });
	}
};

// TODO: complete CRUD operations
