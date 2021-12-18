import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PhysicalPlan from '../typeorm/entities/PhysicalPlan';
import { PhysicalPlanRepository } from '../typeorm/repositories/PhysicalPlanRepository';

interface IResquest {
  name: string;
  start: string;
  end: string;
  user_Id: string;
}

class CreatePhysicalPlanService {
  public async execute({
    start,
    end,
    name,
    user_Id,
  }: IResquest): Promise<PhysicalPlan> {
    const physicalPlanRepository = getCustomRepository(PhysicalPlanRepository);

    function convertDate(date: any) {
      const moonLanding = new Date(date);
      const getMonth = moonLanding.getMonth();
      const month = getMonth + 1;
      return month;
    }

    const physicalPlanExist = await physicalPlanRepository.findOne({
      where: {
        name,
      },
    });

    const dateForNewPlan = convertDate(start);
    const dateCurentyPlan = convertDate(physicalPlanExist?.start);

    if (dateForNewPlan === dateCurentyPlan) {
      throw new AppError(
        `there is already a physical Plan for the month of ${dateForNewPlan} `,
      );
    }

    if (physicalPlanExist) {
      throw new AppError('There is already one physical Plan with this name');
    }

    const physicalPlan = physicalPlanRepository.create({
      name,
      start,
      end,
      user_Id,
    });

    await physicalPlanRepository.save(physicalPlan);
    return physicalPlan;
  }
}

export default CreatePhysicalPlanService;
