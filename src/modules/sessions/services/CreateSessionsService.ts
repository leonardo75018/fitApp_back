import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Session from '../typeorm/entities/Session';
import { SessionsRepository } from '../typeorm/repositories/SessionsRepository';

interface IResquest {
  name: string;
  backDrop: string;
}

class CreateSessionsService {
  public async execute({ name, backDrop }: IResquest): Promise<Session> {
    const sessionsRepository = getCustomRepository(SessionsRepository);

    const sessionExist = await sessionsRepository.findOne({
      where: {
        name,
      },
    });

    if (sessionExist) {
      throw new AppError('There is already one session with this name');
    }

    const session = sessionsRepository.create({
      name,
      backDrop,
    });

    await sessionsRepository.save(session);
    return session;
  }
}

export default CreateSessionsService;
