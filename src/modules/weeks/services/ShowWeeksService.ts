import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Week from '../typeorm/entities/Weeks';
import { WeeksRepository } from '../typeorm/repositories/WeeksRepository';

interface IRequest {
  id: string;
}

class ShowWeekService {
  public async execute({ id }: IRequest): Promise<Week> {
    const weeksRepository = getCustomRepository(WeeksRepository);

    const week = await weeksRepository.findOne(id);

    if (!week) {
      throw new AppError('Week not found');
    }

    return week;
  }
}

export default ShowWeekService;
