import { Request, Response } from 'express';
import CreateExercice_session_Service from '../services/CreateExercice_session_Service';
import DeleteExercice_session_Service from '../services/DeleteExercice_session_Service';
import ListExerice_session_ById_Service from '../services/ListExercices_session_ById_Service';
import ListExerice_session_Service from '../services/ListExercices_session_Service';
import ShowExercice_session_Service from '../services/ShowExercice_session_Service';
import UpdateExercice_section_Service from '../services/UpdateExercice_session_Service';

class Exerice_sessionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listExercice_session = new ListExerice_session_Service();

    const exercices_session = await listExercice_session.execute();

    return response.json(exercices_session);
  }
  public async list_exercice_session_ById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { sessions_id } = request.params;
    const listExercice_session_ById = new ListExerice_session_ById_Service();

    const exerciceSession = await listExercice_session_ById.execute({
      sessions_id,
    });
    return response.json(exerciceSession);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showExerice_session = new ShowExercice_session_Service();

    const exercice_session = await showExerice_session.execute({ id });

    return response.json(exercice_session);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { repetitions, intensity, sessions_id, exercices_id } = request.body;

    const createExercice_session = new CreateExercice_session_Service();

    const exercice_session = await createExercice_session.execute({
      repetitions,
      intensity,
      sessions_id,
      exercices_id,
    });

    return response.json(exercice_session);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { repetitions, intensity, sessions_id, exercices_id } = request.body;


    const updateExercice_session = new UpdateExercice_section_Service();

    const exercice_session_Update = await updateExercice_session.execute({
      id,
      repetitions,
      intensity,
      sessions_id,
      exercices_id,
    });

    return response.json(exercice_session_Update);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteExercice_session = new DeleteExercice_session_Service();
    await deleteExercice_session.execute({ id });

    return response.json([]);
  }
}

export default Exerice_sessionController;
