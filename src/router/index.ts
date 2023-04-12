import Router from 'express';
import contactRouter from './contactRouter.js';
import employeRouter from './employeeRouter.js';
import newsRouter from './newsRouter.js';

const router = Router();

router.use('/contact', contactRouter);
router.use('/employee', employeRouter);
router.use('/news', newsRouter);

export default router;
