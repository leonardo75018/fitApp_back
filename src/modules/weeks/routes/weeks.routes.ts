import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import WeeksController from '../controllers/WeeksServiceController';

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

weeksRoute.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      start: Joi.date().required(),
      end: Joi.date().required(),
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
