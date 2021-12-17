import { Request, Response } from 'express';
import CreateWeeksService from '../services/CreateWeeksService';
import DeleteWeeksService from '../services/DeleteWeeksService';
import ListWeeksByPhysicalPlanService from '../services/ListWeeksByPhysicalPlanService';
import ListWeeksService from '../services/ListWeeksService';
import ShowWeekService from '../services/ShowWeeksService';
import UpdateWeeksService from '../services/UpdateWeekService';

class WeeksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listWeeks = new ListWeeksService();

    const weeks = await listWeeks.execute();
    return response.json(weeks);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showWeek = new ShowWeekService();

    const week = await showWeek.execute({ id });

    return response.json(week);
  }

  public async listByPhysical(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { physical_plan_id } = request.params;

    const listWeekByPhysicalPlan = new ListWeeksByPhysicalPlanService();

    const weeksByPhysicalPlan = await listWeekByPhysicalPlan.execute({
      physical_plan_id,
    });

    return response.json(weeksByPhysicalPlan);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, start, end, physical_plan_id } = request.body;

    const createWeek = new CreateWeeksService();

    const week = await createWeek.execute({
      name,
      end,
      start,
      physical_plan_id,
    });

    return response.json(week);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, start, end } = request.body;
    const { id } = request.params;

    const updateWeek = new UpdateWeeksService();

    const weekUpdate = await updateWeek.execute({
      id,
      name,
      end,
      start,
    });

    return response.json(weekUpdate);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteWeek = new DeleteWeeksService();
    await deleteWeek.execute({ id });

    return response.json([]);
  }
}

export default WeeksController;
