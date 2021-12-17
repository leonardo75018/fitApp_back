import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ExerciceController from '../controllers/ExerciceController';

const exerciceRoute = Router();
const exerciceCrontroller = new ExerciceController();

exerciceRoute.get('/', isAuthenticated, exerciceCrontroller.index);

exerciceRoute.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  exerciceCrontroller.show,
);

exerciceRoute.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      videoUrl: Joi.string().required(),
    },
  }),
  exerciceCrontroller.create,
);

exerciceRoute.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  exerciceCrontroller.update,
);

exerciceRoute.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  exerciceCrontroller.delete,
);

export default exerciceRoute;
