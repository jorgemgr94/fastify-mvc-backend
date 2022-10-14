import { getModelForClass, ModelOptions, prop } from '@typegoose/typegoose';

enum PetGender {
  MALE = 'male',
  FEMALE = 'female'
}

@ModelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Pet {
  @prop({ type: String, trim: true, required: true })
  public name: string;

  @prop({ type: String, enum: PetGender })
  public gender: string;
}

const PetModel = getModelForClass(Pet);

export default PetModel;
