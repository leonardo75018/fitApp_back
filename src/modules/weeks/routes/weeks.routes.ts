import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import WeeksController from '../controllers/WeeksController';

const weeksRoute = Router();
const weeksCrontroller = new WeeksController();

weeksRoute.get('/', isAuthenticated, weeksCrontroller.index);

weeksRoute.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  weeksCrontroller.show,
);

weeksRoute.get(
  '/physical/:physical_plan_id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      physical_plan_id: Joi.string().uuid().required(),
    },
  }),
  weeksCrontroller.listByPhysical,
);

weeksRoute.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      start: Joi.date().required(),
      end: Joi.date().required(),
      physical_plan_id: Joi.string().uuid().required(),
    },
  }),
  weeksCrontroller.create,
);

weeksRoute.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  weeksCrontroller.update,
);

weeksRoute.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  weeksCrontroller.delete,
);

export default weeksRoute;
