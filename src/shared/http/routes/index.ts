import { Router } from 'express';
import physicalPlanRoute from '@modules/physicalPlan/routes/physicalPlan.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import weeksRoute from '@modules/weeks/routes/weeks.routes';
import sessionsRoute from '@modules/sessions/routes/sessions.routes';

const route = Router();

route.use('/physicalplans', physicalPlanRoute);
route.use('/users', usersRouter);
route.use('/login', sessionsRouter);
route.use('/password', passwordRouter);
route.use('/weeks', weeksRoute);
route.use('/sessions', sessionsRoute);

export default route;
