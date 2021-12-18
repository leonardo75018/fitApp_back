import { getCustomRepository } from 'typeorm';
import Exercice_session from '../typeorm/entities/Exercice_session';
import { Exercice_session_Repository } from '../typeorm/repositories/Exercice_session_Repository';

interface IRequest {
  sessions_id: string;
}

class ListExerice_session_ById_Service {
  public async execute({
    sessions_id,
  }: IRequest): Promise<Exercice_session[] | undefined> {
    const exercice_session_Repository = getCustomRepository(
      Exercice_session_Repository,
    );

    const exercice_session = exercice_session_Repository.find({
      relations: ['exercices', 'sessions'],
      where: {
        sessions_id: sessions_id,
      },
    });

    return exercice_session;
  }
}

export default ListExerice_session_ById_Service;
