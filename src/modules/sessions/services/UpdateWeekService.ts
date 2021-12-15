import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Session from '../typeorm/entities/Session';
import { SessionsRepository } from '../typeorm/repositories/SessionsRepository';

interface IRequest {
  id: string;
  name: string;
  backDrop: string;
}

class UpdateSessionsService {
  public async execute({ name, backDrop, id }: IRequest): Promise<Session> {
    const sessionsRepository = getCustomRepository(SessionsRepository);

    const session = await sessionsRepository.findOne(id);

    if (!session) {
      throw new AppError('Session not found.');
    }

    const sessionExist = await sessionsRepository.findOne(name);

    if (sessionExist) {
      throw new AppError('There is already one Session with this name');
    }

    session.name = name;
    session.backDrop = backDrop;

    await sessionsRepository.save(session);

    return session;
  }
}

export default UpdateSessionsService;
