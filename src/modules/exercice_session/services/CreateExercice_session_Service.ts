import { getCustomRepository } from 'typeorm';
import { Exercice_session_Repository } from '../typeorm/repositories/Exercice_session_Repository';
import Exercice_session from '../typeorm/entities/Exercice_session';
import AppError from '@shared/errors/AppError';

interface IResquest {
  repetitions: string;
  intensity: string;
  sessions_id: string;
  exercices_id: string;
}

class CreateExercice_session_Service {
  public async execute({
    repetitions,
    intensity,
    sessions_id,
    exercices_id,
  }: IResquest): Promise<Exercice_session> {
    const exercice_sessionRepository = getCustomRepository(
      Exercice_session_Repository,
    );

    const exerciceExist = await exercice_sessionRepository.findOne({
      relations: ['exercices'],
      where: {
        exercices_id,
      },
    });

    if (exerciceExist) {
      throw new AppError(
        `There is already one exercice type: ${exerciceExist?.exercices.name} in this Exercice seance`,
      );
    }

    const exercice_session = exercice_sessionRepository.create({
      repetitions,
      intensity,
      sessions_id,
      exercices_id,
    });

    await exercice_sessionRepository.save(exercice_session);
    return exercice_session;
  }
}

export default CreateExercice_session_Service;
