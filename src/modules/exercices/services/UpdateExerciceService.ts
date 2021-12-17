import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Exercice from '../typeorm/entities/Exercices';
import { ExercicesRepository } from '../typeorm/repositories/ExercicesRepository';

interface IRequest {
  id: string;
  name: string;
  videoUrl: string;
}

class UpdateExerciceService {
  public async execute({ id, name, videoUrl }: IRequest): Promise<Exercice> {
    const exerciceRepository = getCustomRepository(ExercicesRepository);

    const exercice = await exerciceRepository.findOne(id);

    if (!exercice) {
      throw new AppError('Sorry Exercice not found.');
    }

    const exerciceExist = await exerciceRepository.findOne({
      where: {
        name,
      },
    });

    if (exerciceExist) {
      throw new AppError('There is already one Exercice with this name');
    }

    exercice.name = name;
    exercice.videoUrl = videoUrl;

    await exerciceRepository.save(exercice);

    return exercice;
  }
}

export default UpdateExerciceService;
