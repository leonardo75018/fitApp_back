import { Request, Response } from 'express';
import CreateExerciceService from '../services/CreateExerciceService';
import DeleteExerciceService from '../services/DeleteExerciceService';
import ListExercicesService from '../services/ListExercicesService';
import ShowExerciceService from '../services/ShowExerciceService';
import UpdateExerciceService from '../services/UpdateExerciceService';

class ExerciceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listExercices = new ListExercicesService();

    const exercices = await listExercices.execute();
    return response.json(exercices);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showExercice = new ShowExerciceService();

    const exercice = await showExercice.execute({ id });

    return response.json(exercice);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, videoUrl } = request.body;

    const createExercice = new CreateExerciceService();

    const exercice = await createExercice.execute({
      name,
      videoUrl,
    });

    return response.json(exercice);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, videoUrl } = request.body;
    const { id } = request.params;

    const updateExercice = new UpdateExerciceService();

    const exerciceUpdate = await updateExercice.execute({
      name,
      videoUrl,
      id,
    });

    return response.json(exerciceUpdate);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteExercice = new DeleteExerciceService();
    await deleteExercice.execute({ id });

    return response.json([]);
  }
}

export default ExerciceController;
