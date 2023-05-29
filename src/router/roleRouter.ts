import Router from 'express';
import RoleController from '../controllers/RoleController.js';

const roleRouter = Router();

roleRouter.get('/', RoleController.getRoles);
roleRouter.get('/:roleId', RoleController.getRoleById);

export default roleRouter;
