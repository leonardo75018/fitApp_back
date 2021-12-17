import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import SessionsController from '../controllers/SessionsController';

const sessionsRoute = Router();
const sessionsCrontroller = new SessionsController();

sessionsRoute.get('/', isAuthenticated, sessionsCrontroller.index);

sessionsRoute.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  sessionsCrontroller.show,
);

sessionsRoute.get(
  '/week/:week_id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      week_id: Joi.string().uuid().required(),
    },
  }),
  sessionsCrontroller.listByWeek,
);

sessionsRoute.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      backDrop: Joi.string().required(),
      week_id: Joi.string().uuid().required(),
    },
  }),
  sessionsCrontroller.create,
);

sessionsRoute.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  sessionsCrontroller.update,
);

sessionsRoute.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  sessionsCrontroller.delete,
);

export default sessionsRoute;
