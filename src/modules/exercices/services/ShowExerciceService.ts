import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Exercice from '../typeorm/entities/Exercices';
import { ExercicesRepository } from '../typeorm/repositories/ExercicesRepository';

interface IRequest {
  id: string;
}

class ShowExerciceService {
  public async execute({ id }: IRequest): Promise<Exercice> {
    const exerciceRepository = getCustomRepository(ExercicesRepository);

    const exercice = await exerciceRepository.findOne(id);

    if (!exercice) {
      throw new AppError('Sorry Exercice not found');
    }

    return exercice;
  }
}

export default ShowExerciceService;
