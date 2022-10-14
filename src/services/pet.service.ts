import PetModel from '../models/pet.model';

export const getPets = async () => {
  const pets = await PetModel.find();
  return pets;
};

export const getPetById = async (petId: string) => {
  try {
    const pet = await PetModel.findById(petId);
    return pet;
  } catch (error) {
    return null;
  }
};
