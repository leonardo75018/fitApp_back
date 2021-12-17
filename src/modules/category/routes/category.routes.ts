import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import CategoryController from '../controllers/CategorysController';

const categoryRoute = Router();
const categoryCrontroller = new CategoryController();

categoryRoute.get('/', isAuthenticated, categoryCrontroller.index);

categoryRoute.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoryCrontroller.show,
);

categoryRoute.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  categoryCrontroller.create,
);

categoryRoute.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoryCrontroller.update,
);

categoryRoute.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoryCrontroller.delete,
);

export default categoryRoute;
