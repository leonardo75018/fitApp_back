import { Router } from 'express';
import PhysicalPlanController from '../controllers/PhysicalPlanServiceController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const physicalPlanRoute = Router();
const physicalPlanCrontroller = new PhysicalPlanController();

physicalPlanRoute.get('/', isAuthenticated, physicalPlanCrontroller.index);

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
