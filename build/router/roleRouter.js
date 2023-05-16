import Router from 'express';
import RoleController from '../controllers/RoleController.js';
const roleRouter = Router();
roleRouter.get('/:roleId', RoleController.getRoleById);
export default roleRouter;
//# sourceMappingURL=roleRouter.js.map