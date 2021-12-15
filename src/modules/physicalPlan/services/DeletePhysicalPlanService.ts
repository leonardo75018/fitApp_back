import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { PhysicalPlanRepository } from '../typeorm/repositories/PhysicalPlanRepository';

interface IRequest {
  id: string;
}

class DeletePhysicalPlanService {
  public async execute({ id }: IRequest): Promise<void> {
    const physicalPlanRepository = getCustomRepository(PhysicalPlanRepository);

    const physicalPlan = await physicalPlanRepository.findOne(id);

    if (!physicalPlan) {
      throw new AppError('Physical Plan not found');
    }

    await physicalPlanRepository.remove(physicalPlan);
  }
}

export default DeletePhysicalPlanService;
