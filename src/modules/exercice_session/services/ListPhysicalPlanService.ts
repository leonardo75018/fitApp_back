import { getCustomRepository } from 'typeorm';
import PhysicalPlan from '../typeorm/entities/PhysicalPlan';
import { PhysicalPlanRepository } from '../typeorm/repositories/PhysicalPlanRepository';

class ListPhysicalPlansService {
  public async execute(): Promise<PhysicalPlan[] | undefined> {
    const physicalPlanRepository = getCustomRepository(PhysicalPlanRepository);

    const physicalPlans = physicalPlanRepository.find({
      relations: ['user'],
      order: {
        name: 'ASC',
      },
    });

    return physicalPlans;
  }
}

export default ListPhysicalPlansService;



// const physicalPlans = physicalPlanRepository.find({
//   relations: ['user'],
//   where: {
//     user_Id: '599b9e00-2075-416d-9c84-91185d8e6107',
//   },
// });
