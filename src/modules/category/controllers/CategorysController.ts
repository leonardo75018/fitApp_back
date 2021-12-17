import { Request, Response } from 'express';
import CreateCategorysService from '../services/CreateCategorysService';
import DeleteCategoryService from '../services/DeleteCategoryService';
import ListCategorysService from '../services/ListCategorysService';
import ShowCategoryService from '../services/ShowCategorysService';
import UpdateCategorysService from '../services/UpdateCategoryService';

class CategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategory = new ListCategorysService();

    const categorys = await listCategory.execute();
    return response.json(categorys);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCategory = new ShowCategoryService();

    const category = await showCategory.execute({ id });

    return response.json(category);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = new CreateCategorysService();

    const category = await createCategory.execute({
      name,
    });

    return response.json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateCategory = new UpdateCategorysService();

    const categoryUpdate = await updateCategory.execute({
      id,
      name,
    });

    return response.json(categoryUpdate);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategory = new DeleteCategoryService();

    await deleteCategory.execute({ id });

    return response.json([]);
  }
}

export default CategoryController;
