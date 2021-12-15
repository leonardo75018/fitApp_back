import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PhysicalPlan from '../typeorm/entities/PhysicalPlan';
import { PhysicalPlanRepository } from '../typeorm/repositories/PhysicalPlanRepository';

interface IRequest {
  id: string;
  name: string;
  start: string;
  end: string;
}

class UpdatePhysicalPlanService {
  public async execute({
    id,
    name,
    start,
    end,
  }: IRequest): Promise<PhysicalPlan> {
    const physicalPlanRepository = getCustomRepository(PhysicalPlanRepository);

    const physicalPlan = await physicalPlanRepository.findOne({
      where: {
        id,
      },
    });

    if (!physicalPlan) {
      throw new AppError('Physical Plan not found.');
    }

    const physicalPlanExist = await physicalPlanRepository.findOne({
      where: {
        name,
      },
    });

    if (physicalPlanExist) {
      throw new AppError('There is already one physical Plan with this name');
    }

    physicalPlan.name = name;
    physicalPlan.start = start;
    physicalPlan.end = end;

    await physicalPlanRepository.save(physicalPlan);

    return physicalPlan;
  }
}

export default UpdatePhysicalPlanService;
