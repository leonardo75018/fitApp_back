import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { SessionsRepository } from '../typeorm/repositories/SessionsRepository';

interface IRequest {
  id: string;
}

class DeleteSessionsService {
  public async execute({ id }: IRequest): Promise<void> {
    const sessionsRepository = getCustomRepository(SessionsRepository);

    const session = await sessionsRepository.findOne(id);

    if (!session) {
      throw new AppError('Session not found');
    }

    await sessionsRepository.remove(session);
  }
}

export default DeleteSessionsService;
