import Router from 'express';
import contactRouter from './contactRouter.js';
import newsRouter from './newsRouter.js';
import certificateRouter from './certificateRouter.js';

// import employeRouter from './employeeRouter.js';
// import vehicleRouter from './vehicleRouter.js';
// import constructionWorksRouter from './constructionWorksRouter.js';

const router = Router();

router.use('/contact', contactRouter);
router.use('/news', newsRouter);
router.use('/certificates', certificateRouter);

// router.use('/employee', employeRouter);
// router.use('/vehicle', vehicleRouter);
// router.use('/construction-works', constructionWorksRouter);

export default router;
