import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Exercice_session_Repository } from '../typeorm/repositories/Exercice_session_Repository';

interface IRequest {
  id: string;
}

class DeleteExercice_session_Service {
  public async execute({ id }: IRequest): Promise<void> {
    const exercice_session_Repository = getCustomRepository(
      Exercice_session_Repository,
    );

    const exercice_section = await exercice_session_Repository.findOne(id);

    if (!exercice_section) {
      throw new AppError('ooh Sorry! Exercice section not found');
    }

    await exercice_session_Repository.remove(exercice_section);
  }
}

export default DeleteExercice_session_Service;
