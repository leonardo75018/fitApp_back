import { EntityRepository, Repository } from 'typeorm';
import Weeks from '../entities/Weeks';

@EntityRepository(Weeks)
export class WeeksRepository extends Repository<Weeks> {
  public async findById(id: string): Promise<Weeks | undefined> {
    const weeks = this.findOne({
      where: {
        id,
      },
    });
    return weeks;
  }
}
