import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Weeks from '../typeorm/entities/Weeks';
import { WeeksRepository } from '../typeorm/repositories/WeeksRepository';

interface IRequest {
  physical_plan_id: string;
}

class ListWeeksByPhysicalPlanService {
  public async execute({
    physical_plan_id,
  }: IRequest): Promise<Weeks[] | undefined> {
    const weeksRepository = getCustomRepository(WeeksRepository);

    const weeks = weeksRepository.find({
      relations: ['physical_plan'],
      where: {
        physical_plan_id: physical_plan_id,
      },

      order: {
        name: 'ASC',
        id: 'DESC',
      },
    });

    if (!weeks) {
      throw new AppError('dont have weeks for the physical plan');
    }
    return weeks;
  }
}

export default ListWeeksByPhysicalPlanService;
