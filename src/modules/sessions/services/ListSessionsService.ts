import { getCustomRepository } from 'typeorm';
import Session from '../typeorm/entities/Session';
import { SessionsRepository } from '../typeorm/repositories/SessionsRepository';

class ListSessionsService {
  public async execute(): Promise<Session[] | undefined> {
    const sessionsRepository = getCustomRepository(SessionsRepository);

    const sessions = sessionsRepository.find({
      relations: ['week'],
      order: {
        name: 'ASC',
      },
    });

    return sessions;
  }
}

export default ListSessionsService;
