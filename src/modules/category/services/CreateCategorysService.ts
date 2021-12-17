import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Category from '../typeorm/entities/Categorys';
import { CategorysRepository } from '../typeorm/repositories/CategorysRepository';

interface IResquest {
  name: string;
}

class CreateCategorysService {
  public async execute({ name }: IResquest): Promise<Category> {
    const categorysRepository = getCustomRepository(CategorysRepository);

    const categoryExist = await categorysRepository.findOne({
      where: {
        name,
      },
    });

    if (categoryExist) {
      throw new AppError('There is already one Category with this name');
    }

    const category = categorysRepository.create({ name });

    await categorysRepository.save(category);
    return category;
  }
}

export default CreateCategorysService;
