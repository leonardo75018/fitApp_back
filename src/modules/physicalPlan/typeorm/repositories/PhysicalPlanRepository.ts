import { EntityRepository, Repository } from 'typeorm';
import PhysicalPlan from '../entities/PhysicalPlan';

@EntityRepository(PhysicalPlan)
export class PhysicalPlanRepository extends Repository<PhysicalPlan> {
  public async findById(id: string): Promise<PhysicalPlan | undefined> {
    const physicalPlan = this.findOne({
      where: {
        id,
      },
    });
    return physicalPlan;
  }
}
