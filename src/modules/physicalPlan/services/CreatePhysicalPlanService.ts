import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PhysicalPlan from '../typeorm/entities/PhysicalPlan';
import { PhysicalPlanRepository } from '../typeorm/repositories/PhysicalPlanRepository';

interface IResquest {
  name: string;
  start: string;
  end: string;
}

class CreatePhysicalPlanService {
  public async execute({ start, end, name }: IResquest): Promise<PhysicalPlan> {
    const physicalPlanRepository = getCustomRepository(PhysicalPlanRepository);

    const physicalPlanExist = await physicalPlanRepository.findOne({
      where: {
        name,
      },
    });

    if (physicalPlanExist) {
      throw new AppError('There is already one physicalPlan with this name');
    }

    const physicalPlan = physicalPlanRepository.create({
      name,
      start,
      end,
    });

    await physicalPlanRepository.save(physicalPlan);
    return physicalPlan;
  }
}

export default CreatePhysicalPlanService;
