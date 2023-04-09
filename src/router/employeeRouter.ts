import Router from 'express';

const employeRouter = Router();

employeRouter.get('/');
employeRouter.post('/');
employeRouter.delete('/employeeId');
employeRouter.put('/employeeId');

export default employeRouter;
