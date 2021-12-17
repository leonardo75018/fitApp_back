import { getCustomRepository } from 'typeorm';
import Category from '../typeorm/entities/Categorys';
import { CategorysRepository } from '../typeorm/repositories/CategorysRepository';

class ListCategorysService {
  public async execute(): Promise<Category[] | undefined> {
    const categoryRepository = getCustomRepository(CategorysRepository);

    const categorys = categoryRepository.find({
      order: {
        name: 'ASC',
      },
    });

    return categorys;
  }
}

export default ListCategorysService;
