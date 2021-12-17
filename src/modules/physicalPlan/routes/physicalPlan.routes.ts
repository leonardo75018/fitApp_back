import { Router } from 'express';
import PhysicalPlanController from '../controllers/PhysicalPlanController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const physicalPlanRoute = Router();
const physicalPlanCrontroller = new PhysicalPlanController();

physicalPlanRoute.get('/', isAuthenticated, physicalPlanCrontroller.index);
physicalPlanRoute.get(
  '/user/:user_id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  physicalPlanCrontroller.listUserPhysicalPlan,
);

physicalPlanRoute.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  physicalPlanCrontroller.show,
);

physicalPlanRoute.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      start: Joi.date().required(),
      end: Joi.date().required(),
      user_Id: Joi.string().uuid().required(),
    },
  }),
  physicalPlanCrontroller.create,
);

physicalPlanRoute.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  physicalPlanCrontroller.update,
);

physicalPlanRoute.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  physicalPlanCrontroller.delete,
);

export default physicalPlanRoute;
