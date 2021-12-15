import { Request, Response } from 'express';
import CreatePhysicalPlanService from '../services/CreatePhysicalPlanService';
import DeletePhysicalPlanService from '../services/DeletePhysicalPlanService';
import ListPhysicalPlansService from '../services/ListPhysicalPlanService';
import ShowPhysicalPlanService from '../services/ShowPhysicalPlanService';
import UpdatePhysicalPlanService from '../services/UpdatePhysicalPlanService';

class PhysicalPlanController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPhysicalPlan = new ListPhysicalPlansService();

    const physicalPlans = await listPhysicalPlan.execute();
    return response.json(physicalPlans);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPhysicalPlan = new ShowPhysicalPlanService();

    const physicalPlan = await showPhysicalPlan.execute({ id });

    return response.json(physicalPlan);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, start, end } = request.body;

    const createPhysicalPlan = new CreatePhysicalPlanService();

    const physicalPlan = await createPhysicalPlan.execute({ name, end, start });

    return response.json(physicalPlan);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, start, end } = request.body;
    const { id } = request.params;

    const updatePhysicalPlan = new UpdatePhysicalPlanService();

    const physicalPlanUpdate = await updatePhysicalPlan.execute({
      id,
      name,
      end,
      start,
    });

    return response.json(physicalPlanUpdate);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePhysicalPlan = new DeletePhysicalPlanService();
    await deletePhysicalPlan.execute({ id });

    return response.json([]);
  }
}

export default PhysicalPlanController;
