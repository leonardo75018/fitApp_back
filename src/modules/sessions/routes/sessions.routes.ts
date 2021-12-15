import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import SessionsController from '../controllers/SessionsServiceController';

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

sessionsRoute.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      backDrop: Joi.string().required(),
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
