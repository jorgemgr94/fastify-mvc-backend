import { FastifyReply, FastifyRequest } from 'fastify';
import * as PetService from '../services/pet.service';

export const searchAll = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const pets = await PetService.getPets();
    reply.code(200).send(pets);
  } catch (err) {
    reply.status(500).send({ message: 'Error retrieving Pets.' });
  }
};

// TODO: move Params type.
export const searchById = async (
  req: FastifyRequest<{ Params: { petId: string } }>,
  reply: FastifyReply
) => {
  try {
    const { petId } = req.params;

    const pet = await PetService.getPetById(petId);
    if (!pet) reply.code(404).send({ message: 'Pet not found' });

    reply.code(200).send(pet);
  } catch (err) {
    reply.status(500).send({ message: 'Error retrieving Pets by id.' });
  }
};

// TODO: complete CRUD operations
