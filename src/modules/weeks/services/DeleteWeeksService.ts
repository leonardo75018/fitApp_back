import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { WeeksRepository } from '../typeorm/repositories/WeeksRepository';

interface IRequest {
  id: string;
}

class DeleteWeeksService {
  public async execute({ id }: IRequest): Promise<void> {
    const weeksRepository = getCustomRepository(WeeksRepository);

    const week = await weeksRepository.findOne(id);

    if (!week) {
      throw new AppError('Week not found');
    }

    await weeksRepository.remove(week);
  }
}

export default DeleteWeeksService;
