import { getCustomRepository } from 'typeorm';
import { Exercice_session_Repository } from '../typeorm/repositories/Exercice_session_Repository';
import Exercice_session from '../typeorm/entities/Exercice_session';

interface IResquest {
  repetitions: string;
  intensity: string;
  session_id: string;
  exercice_id: string;
}

class CreateExercice_sessionService {
  public async execute({
    repetitions,
    intensity,
    session_id,
    exercice_id,
  }: IResquest): Promise<Exercice_session> {
    const exercice_sessionRepository = getCustomRepository(
      Exercice_session_Repository,
    );

    // const categoryExist = await categorysRepository.findOne({
    //   where: {
    //     name,
    //   },
    // });

    // if (categoryExist) {
    //   throw new AppError('There is already one Category with this name');
    // }

    const exercice_session = exercice_sessionRepository.create({
      repetitions,
      intensity,
      session_id,
      exercice_id,
    });

    await exercice_sessionRepository.save(exercice_session);
    return exercice_session;
  }
}

export default CreateExercice_sessionService;
