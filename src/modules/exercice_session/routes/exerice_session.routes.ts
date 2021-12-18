import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import Exerice_sessionController from '../controllers/Exerice_sessionController';

const exercice_sessionRoute = Router();
const exercice_sessionCrontroller = new Exerice_sessionController();

exercice_sessionRoute.get(
  '/',
  isAuthenticated,
  exercice_sessionCrontroller.index,
);

exercice_sessionRoute.get(
  '/session/:sessions_id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      sessions_id: Joi.string().uuid().required(),
    },
  }),
  exercice_sessionCrontroller.list_exercice_session_ById,
);

exercice_sessionRoute.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  exercice_sessionCrontroller.show,
);

exercice_sessionRoute.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      repetitions: Joi.string().required(),
      intensity: Joi.string().required(),
      sessions_id: Joi.string().uuid().required(),
      exercices_id: Joi.string().uuid().required(),
    },
  }),
  exercice_sessionCrontroller.create,
);

exercice_sessionRoute.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      repetitions: Joi.string().required(),
      intensity: Joi.string().required(),
      sessions_id: Joi.string().uuid().required(),
      exercices_id: Joi.string().uuid().required(),
    },
  }),
  exercice_sessionCrontroller.update,
);

exercice_sessionRoute.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  exercice_sessionCrontroller.delete,
);

export default exercice_sessionRoute;
