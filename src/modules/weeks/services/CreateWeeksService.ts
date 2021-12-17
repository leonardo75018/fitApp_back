import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Weeks from '../typeorm/entities/Weeks';
import { WeeksRepository } from '../typeorm/repositories/WeeksRepository';

interface IResquest {
  name: string;
  start: string;
  end: string;
  physical_plan_id: string;
}

class CreateWeeksService {
  public async execute({
    start,
    end,
    name,
    physical_plan_id,
  }: IResquest): Promise<Weeks> {
    const weeksRepository = getCustomRepository(WeeksRepository);

    const weeksExist = await weeksRepository.findOne({
      where: {
        name,
      },
    });

    if (weeksExist) {
      throw new AppError('There is already one weeks with this name');
    }

    const weeks = weeksRepository.create({
      name,
      start,
      end,
      physical_plan_id,
    });

    await weeksRepository.save(weeks);
    return weeks;
  }
}

export default CreateWeeksService;
