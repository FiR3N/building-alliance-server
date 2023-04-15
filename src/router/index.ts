import Router from 'express';
import contactRouter from './contactRouter.js';
import employeRouter from './employeeRouter.js';
import newsRouter from './newsRouter.js';
import vehicleRouter from './vehicleRouter.js';
import constructionWorksRouter from './constructionWorksRouter.js';

const router = Router();

router.use('/contact', contactRouter);
router.use('/employee', employeRouter);
router.use('/news', newsRouter);
router.use('/vehicle', vehicleRouter);
router.use('/construction-works', constructionWorksRouter);

export default router;
