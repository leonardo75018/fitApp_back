import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Exercice_session from '../typeorm/entities/Exercice_session';
import { Exercice_session_Repository } from '../typeorm/repositories/Exercice_session_Repository';

interface IRequest {
  id: string;
}

class ShowExercice_session_Service {
  public async execute({ id }: IRequest): Promise<Exercice_session> {
    const exercice_sessionRepository = getCustomRepository(
      Exercice_session_Repository,
    );

    const exercice_session = await exercice_sessionRepository.findOne(id, {
      relations: ['exercices'],
    });

    if (!exercice_session) {
      throw new AppError('Oooh sorry! Exercice Sesstion not found');
    }

    return exercice_session;
  }
}

export default ShowExercice_session_Service;
