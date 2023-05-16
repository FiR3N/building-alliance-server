import Router from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
const userRouter = Router();
userRouter.get('/', authMiddleware, checkRoleMiddleware([1]), UserController.getUsers);
userRouter.get('/refresh', UserController.refresh);
userRouter.get('/:userId', authMiddleware, UserController.getUserById);
userRouter.post('/logout', UserController.logout);
userRouter.post('/', authMiddleware, checkRoleMiddleware([1]), UserController.addUser);
userRouter.post('/login', UserController.login);
userRouter.delete('/:userId', authMiddleware, checkRoleMiddleware([1]), UserController.deleteUser);
userRouter.put('/:userId', authMiddleware, checkRoleMiddleware([1]), UserController.putUser);
userRouter.put('/by-user/:userId', authMiddleware, UserController.putUserByUser);
export default userRouter;
//# sourceMappingURL=userRouter.js.map