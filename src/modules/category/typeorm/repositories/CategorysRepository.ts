import { EntityRepository, Repository } from 'typeorm';
import Categorys from '../entities/Categorys';

@EntityRepository(Categorys)
export class CategorysRepository extends Repository<Categorys> {
  public async findById(id: string): Promise<Categorys | undefined> {
    const category = this.findOne({
      where: {
        id,
      },
    });
    return category;
  }
}
