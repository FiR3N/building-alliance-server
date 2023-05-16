import Router from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const userRouter = Router();
userRouter.get('/', authMiddleware, checkRoleMiddleware([1]), UserController.getUsers); //getAll
userRouter.get('/refresh', UserController.refresh); // refresh
userRouter.get('/:userId', authMiddleware, UserController.getUserById); //getOne
userRouter.post('/logout', UserController.logout); // logout
userRouter.post('/', authMiddleware, checkRoleMiddleware([1]), UserController.addUser); // create
userRouter.post('/login', UserController.login); // login
userRouter.delete('/:userId', authMiddleware, checkRoleMiddleware([1]), UserController.deleteUser); //deleteOne
userRouter.put('/:userId', authMiddleware, checkRoleMiddleware([1]), UserController.putUser); //updateOneByAdmin
userRouter.put('/by-user/:userId', authMiddleware, UserController.putUserByUser); //updateOneByUser

export default userRouter;
