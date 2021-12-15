import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Sessions from '../typeorm/entities/Session';
import { SessionsRepository } from '../typeorm/repositories/SessionsRepository';

interface IRequest {
  id: string;
}

class ShowSessionService {
  public async execute({ id }: IRequest): Promise<Sessions> {
    const sessionsRepository = getCustomRepository(SessionsRepository);

    const session = await sessionsRepository.findOne(id);

    if (!session) {
      throw new AppError('Session not found');
    }

    return session;
  }
}

export default ShowSessionService;
