import { EntityRepository, Repository } from 'typeorm';
import Exercice_session from '../entities/Exercice_session';

@EntityRepository(Exercice_session)
export class Exercice_session_Repository extends Repository<Exercice_session> {
  public async findById(id: string): Promise<Exercice_session | undefined> {
    const exercice_session = this.findOne({
      where: {
        id,
      },
    });
    return exercice_session;
  }
}
