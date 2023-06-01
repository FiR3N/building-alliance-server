import Router from 'express';
import emailRouter from './emailRouter.js';
import newsRouter from './newsRouter.js';
import certificateRouter from './certificateRouter.js';
import serviceRouter from './serviceRouter.js';
import workRouter from './workRouter.js';
import userRouter from './userRouter.js';
import roleRouter from './roleRouter.js';
import vacancyRouter from './vacanciesRouter.js';
import mixturesRouter from './mixturesRouter.js';
import mixtureTypesRouter from './mixtureTypesRouter.js';
import vehicleRouter from './vehicleRouter.js';

// import employeRouter from './employeeRouter.js';
// import vehicleRouter from './vehicleRouter.js';
// import constructionWorksRouter from './constructionWorksRouter.js';

const router = Router();

router.use('/email', emailRouter);
router.use('/news', newsRouter);
router.use('/certificates', certificateRouter);
router.use('/services', serviceRouter);
router.use('/works', workRouter);
router.use('/vacancies', vacancyRouter);
router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/mixtures', mixturesRouter);
router.use('/mixture-types', mixtureTypesRouter);
router.use('/vehicles', vehicleRouter);

// router.use('/employee', employeRouter);
// router.use('/vehicle', vehicleRouter);
// router.use('/construction-works', constructionWorksRouter);

export default router;
