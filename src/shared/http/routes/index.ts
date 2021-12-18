import { Router } from 'express';
import physicalPlanRoute from '@modules/physicalPlan/routes/physicalPlan.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import weeksRoute from '@modules/weeks/routes/weeks.routes';
import sessionsRoute from '@modules/sessions/routes/sessions.routes';
import categoryRoute from '@modules/category/routes/category.routes';
import exerciceRoute from '@modules/exercices/routes/exercice.routes';
import exercice_sessionRoute from '@modules/exercice_session/routes/exerice_session.routes';

const route = Router();

route.use('/login', sessionsRouter);
route.use('/users', usersRouter);
route.use('/password', passwordRouter);
route.use('/physicalplans', physicalPlanRoute);
route.use('/weeks', weeksRoute);
route.use('/sessions', sessionsRoute);
route.use('/category', categoryRoute);
route.use('/exercice', exerciceRoute);
route.use('/exercicesession', exercice_sessionRoute);

export default route;
