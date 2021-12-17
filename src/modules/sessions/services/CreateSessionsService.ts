import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Session from '../typeorm/entities/Session';
import { SessionsRepository } from '../typeorm/repositories/SessionsRepository';

interface IResquest {
  name: string;
  backDrop: string;
  week_id: string;
}

class CreateSessionsService {
  public async execute({
    name,
    backDrop,
    week_id,
  }: IResquest): Promise<Session> {
    const sessionsRepository = getCustomRepository(SessionsRepository);

    // const sessionExist = await sessionsRepository.findOne({
    //   where: {
    //     name,
    //   },
    // });

    // if (sessionExist) {
    //   throw new AppError('There is already one session with this name');
    // }

    const session = sessionsRepository.create({
      name,
      backDrop,
      week_id,
    });

    await sessionsRepository.save(session);
    return session;
  }
}

export default CreateSessionsService;
