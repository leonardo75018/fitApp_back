import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CategorysRepository } from '../typeorm/repositories/CategorysRepository';

interface IRequest {
  id: string;
}

class DeleteCategoryService {
  public async execute({ id }: IRequest): Promise<void> {
    const categoryRepository = getCustomRepository(CategorysRepository);

    const category = await categoryRepository.findOne(id);

    if (!category) {
      throw new AppError('sorry Category not found');
    }

    await categoryRepository.remove(category);
  }
}

export default DeleteCategoryService;
