import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Category from '../typeorm/entities/Categorys';
import { CategorysRepository } from '../typeorm/repositories/CategorysRepository';

interface IRequest {
  id: string;
  name: string;
}

class UpdateCategorysService {
  public async execute({ id, name }: IRequest): Promise<Category> {
    const categoryRepository = getCustomRepository(CategorysRepository);

    const category = await categoryRepository.findOne(id);

    if (!category) {
      throw new AppError('Sorry Category not found.');
    }

    const categoryExist = await categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (categoryExist) {
      throw new AppError('There is already one Category with this name');
    }

    category.name = name;

    await categoryRepository.save(category);

    return category;
  }
}

export default UpdateCategorysService;
