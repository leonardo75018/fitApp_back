import { getCustomRepository } from 'typeorm';
import Weeks from '../typeorm/entities/Weeks';
import { WeeksRepository } from '../typeorm/repositories/WeeksRepository';

class ListWeeksService {
  public async execute(): Promise<Weeks[] | undefined> {
    const weeksRepository = getCustomRepository(WeeksRepository);

    const weeks = weeksRepository.find();

    return weeks;
  }
}

export default ListWeeksService;
