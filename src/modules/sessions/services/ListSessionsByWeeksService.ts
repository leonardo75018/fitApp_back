import { getCustomRepository } from 'typeorm';
import Session from '../typeorm/entities/Session';
import { SessionsRepository } from '../typeorm/repositories/SessionsRepository';

interface IRequest {
  week_id: string;
}

class ListSessionsByweekService {
  public async execute({ week_id }: IRequest): Promise<Session[] | undefined> {
    const sessionsRepository = getCustomRepository(SessionsRepository);

    const sessions = sessionsRepository.find({
      relations: ['week'],
      where: {
        week_id: week_id,
      },
      order: {
        name: 'ASC',
      },
    });

    return sessions;
  }
}

export default ListSessionsByweekService;
