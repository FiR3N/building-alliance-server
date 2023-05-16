import Router from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const userRouter = Router();
userRouter.get('/', authMiddleware, UserController.getUsers);
userRouter.get('/refresh', UserController.refresh);
userRouter.get('/:userId', authMiddleware, UserController.getUserById);
userRouter.post('/logout', UserController.logout);
userRouter.post('/', authMiddleware, UserController.addUser);
userRouter.post('/login', UserController.login);
userRouter.delete('/:userId', authMiddleware, UserController.deleteUser);
userRouter.put('/:userId', authMiddleware, UserController.putUser);
userRouter.put('/by-user/:userId', authMiddleware, UserController.putUserByUser);
export default userRouter;
//# sourceMappingURL=userRouter.js.map