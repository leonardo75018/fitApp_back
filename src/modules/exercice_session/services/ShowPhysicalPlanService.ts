import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PhysicalPlan from '../typeorm/entities/PhysicalPlan';
import { PhysicalPlanRepository } from '../typeorm/repositories/PhysicalPlanRepository';

interface IRequest {
  id: string;
}

class ShowPhysicalPlanService {
  public async execute({ id }: IRequest): Promise<PhysicalPlan> {
    const physicalPlanRepository = getCustomRepository(PhysicalPlanRepository);

    const physicalPlan = await physicalPlanRepository.findOne(id);

    if (!physicalPlan) {
      throw new AppError('PhysicalPlan not found');
    }

    return physicalPlan;
  }
}

export default ShowPhysicalPlanService;
