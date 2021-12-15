import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Weeks from '../typeorm/entities/Weeks';
import { WeeksRepository } from '../typeorm/repositories/WeeksRepository';

interface IRequest {
  id: string;
  name: string;
  start: string;
  end: string;
}

class UpdateWeeksService {
  public async execute({ id, name, start, end }: IRequest): Promise<Weeks> {
    const weekRepository = getCustomRepository(WeeksRepository);

    const week = await weekRepository.findOne({
      where: {
        id,
      },
    });

    if (!week) {
      throw new AppError('Week not found.');
    }

    const weekExist = await weekRepository.findOne({
      where: {
        name,
      },
    });

    if (weekExist) {
      throw new AppError('There is already one Week with this name');
    }

    week.name = name;
    week.start = start;
    week.end = end;

    await weekRepository.save(week);

    return week;
  }
}

export default UpdateWeeksService;
