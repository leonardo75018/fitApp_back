import { getCustomRepository } from 'typeorm';
import Exercice from '../typeorm/entities/Exercices';
import { ExercicesRepository } from '../typeorm/repositories/ExercicesRepository';

class ListExercicesService {
  public async execute(): Promise<Exercice[] | undefined> {
    const exerciceRepository = getCustomRepository(ExercicesRepository);

    const exercices = exerciceRepository.find({
      order: {
        name: 'ASC',
        id: 'DESC',
      },
    });

    return exercices;
  }
}

export default ListExercicesService;
