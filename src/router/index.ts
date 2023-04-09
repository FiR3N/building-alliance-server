import Router from 'express';
import contactRouter from './contactRouter.js';
import employeRouter from './employeeRouter.js';

const router = Router();

router.use('/contact', contactRouter);
router.use('/employee', employeRouter);

export default router;
