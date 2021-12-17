import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ExercicesRepository } from '../typeorm/repositories/ExercicesRepository';

interface IRequest {
  id: string;
}

class DeleteExerciceService {
  public async execute({ id }: IRequest): Promise<void> {
    const exerciceRepository = getCustomRepository(ExercicesRepository);

    const exercice = await exerciceRepository.findOne(id);

    if (!exercice) {
      throw new AppError('Sorry exercice not found');
    }

    await exerciceRepository.remove(exercice);
  }
}

export default DeleteExerciceService;
