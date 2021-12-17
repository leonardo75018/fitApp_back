import { EntityRepository, Repository } from 'typeorm';
import Exercice from '../entities/Exercices';

@EntityRepository(Exercice)
export class ExercicesRepository extends Repository<Exercice> {
  public async findById(id: string): Promise<Exercice | undefined> {
    const exercice = this.findOne({
      where: {
        id,
      },
    });
    return exercice;
  }
}
