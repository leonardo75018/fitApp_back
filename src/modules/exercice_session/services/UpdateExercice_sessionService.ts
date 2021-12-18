import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Exercice_session from '../typeorm/entities/Exercice_session';
import { Exercice_session_Repository } from '../typeorm/repositories/Exercice_session_Repository';

interface IRequest {
  id: string;
  repetitions: string;
  intensity: string;
  sessions_id: string;
  exercices_id: string;
}

class UpdateExercice_section_Service {
  public async execute({
    id,
    repetitions,
    intensity,
    sessions_id,
    exercices_id,
  }: IRequest): Promise<Exercice_session> {
    const exercice_sessionRepository = getCustomRepository(
      Exercice_session_Repository,
    );

    const exercice_session = await exercice_sessionRepository.findOne(id);

    if (!exercice_session) {
      throw new AppError('Oooh sorry! Exercice Sesstion not found');
    }

    const exercice_sessionExist = await exercice_sessionRepository.findOne({
      relations: ['exercices'],
      where: {
        exercices_id,
      },
    });

    if (exercice_sessionExist) {
      throw new AppError(
        `There is already one  exercice session with this exercice${exercice_sessionExist.exercices.name} `,
      );
    }

    exercice_session.repetitions = repetitions;
    exercice_session.intensity = intensity;
    exercice_session.sessions_id = sessions_id;
    exercice_session.exercices_id = exercices_id;

    await exercice_sessionRepository.save(exercice_session);

    return exercice_session;
  }
}

export default UpdateExercice_section_Service;
