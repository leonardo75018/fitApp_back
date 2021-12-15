import { EntityRepository, Repository } from 'typeorm';
import Session from '../entities/Session';

@EntityRepository(Session)
export class SessionsRepository extends Repository<Session> {
  public async findById(id: string): Promise<Session | undefined> {
    const session = this.findOne({
      where: {
        id,
      },
    });
    return session;
  }
}
