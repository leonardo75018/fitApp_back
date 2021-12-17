import { getCustomRepository } from 'typeorm';
import PhysicalPlan from '../typeorm/entities/PhysicalPlan';
import { PhysicalPlanRepository } from '../typeorm/repositories/PhysicalPlanRepository';

interface IRequest {
  user_id: string;
}

class ListUserPhysicalPlansService {
  public async execute({
    user_id,
  }: IRequest): Promise<PhysicalPlan[] | undefined> {
    const physicalPlanRepository = getCustomRepository(PhysicalPlanRepository);

    const userPhysicalPlans = physicalPlanRepository.find({
      relations: ['user'],
      where: {
        user_Id: user_id,
      },
      order: {
        name: 'ASC',
      },
    });

    return userPhysicalPlans;
  }
}

export default ListUserPhysicalPlansService;

// const physicalPlans = physicalPlanRepository.find({
//   relations: ['user'],
//   where: {
//     user_Id: '599b9e00-2075-416d-9c84-91185d8e6107',
//   },
// });
