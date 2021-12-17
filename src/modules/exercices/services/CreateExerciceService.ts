import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Exercice from '../typeorm/entities/Exercices';
import { ExercicesRepository } from '../typeorm/repositories/ExercicesRepository';

interface IResquest {
  name: string;
  videoUrl: string;
}

class CreateExerciceService {
  public async execute({ name, videoUrl }: IResquest): Promise<Exercice> {
    const exerciceRepository = getCustomRepository(ExercicesRepository);

    const exerciceExist = await exerciceRepository.findOne({
      where: {
        name,
      },
    });

    if (exerciceExist) {
      throw new AppError('There is already one exercice with this name');
    }

    const exercice = exerciceRepository.create({
      name,
      videoUrl,
    });

    await exerciceRepository.save(exercice);
    return exercice;
  }
}

export default CreateExerciceService;
