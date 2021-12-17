import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Category from '../typeorm/entities/Categorys';
import { CategorysRepository } from '../typeorm/repositories/CategorysRepository';

interface IRequest {
  id: string;
}

class ShowCategoryService {
  public async execute({ id }: IRequest): Promise<Category> {
    const categoryRepository = getCustomRepository(CategorysRepository);

    const category = await categoryRepository.findOne(id);

    if (!category) {
      throw new AppError('Sorry Category not found');
    }

    return category;
  }
}

export default ShowCategoryService;
