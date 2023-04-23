import Router from 'express';
import EmployeeController from '../controllers/EmployeeController.js';

const employeRouter = Router();

employeRouter.get('/', EmployeeController.getEmployees);
employeRouter.post('/', EmployeeController.addEmployee);
employeRouter.delete('/:employeeId', EmployeeController.deleteEmployee);
employeRouter.put('/:employeeId', EmployeeController.putEmployee);

export default employeRouter;
