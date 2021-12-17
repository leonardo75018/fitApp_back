import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import DeleteSessionsService from '../services/DeleteSessionsService';
import ListSessionsByweekService from '../services/ListSessionsByWeeksService';
import ListSessionsService from '../services/ListSessionsService';
import ShowSessionService from '../services/ShowSessionsService';
import UpdateSessionsService from '../services/UpdateSessionsService';

class SessionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSessios = new ListSessionsService();

    const sessions = await listSessios.execute();
    return response.json(sessions);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSession = new ShowSessionService();

    const session = await showSession.execute({ id });

    return response.json(session);
  }

  public async listByWeek(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { week_id } = request.params;

    const listSessionsByWeek = new ListSessionsByweekService();

    const sessionsByweek = await listSessionsByWeek.execute({ week_id });

    return response.json(sessionsByweek);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, backDrop, week_id } = request.body;

    const createSession = new CreateSessionsService();

    const session = await createSession.execute({ name, backDrop, week_id });

    return response.json(session);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, backDrop } = request.body;
    const { id } = request.params;

    const updateSession = new UpdateSessionsService();

    const sessionUpdate = await updateSession.execute({
      id,
      name,
      backDrop,
    });

    return response.json(sessionUpdate);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSessin = new DeleteSessionsService();
    await deleteSessin.execute({ id });

    return response.json([]);
  }
}

export default SessionsController;
