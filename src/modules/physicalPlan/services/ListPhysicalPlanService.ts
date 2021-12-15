import { getCustomRepository } from 'typeorm';
import PhysicalPlan from '../typeorm/entities/PhysicalPlan';
import { PhysicalPlanRepository } from '../typeorm/repositories/PhysicalPlanRepository';

class ListPhysicalPlansService {
  public async execute(): Promise<PhysicalPlan[] | undefined> {
    const physicalPlanRepository = getCustomRepository(PhysicalPlanRepository);

    const physicalPlans = physicalPlanRepository.find();

    return physicalPlans;
  }
}

export default ListPhysicalPlansService;
